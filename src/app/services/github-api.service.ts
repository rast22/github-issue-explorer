import {Injectable} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {ApolloError, DocumentNode} from "@apollo/client";
import {Router} from "@angular/router";
import validateToken from "../queries/validateToken";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  private _token: string | null = null;

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _apollo: Apollo,
    private _router: Router) {  }

  set token(token: string | null) {
    this._token = token;
  }

  get token(): string | null {
    return this._token;
  }

  logout() {
    this.token = null;
    this._router.navigate(['/'])
  }

  get $loading() {
    return this._loading.asObservable();
  }

  get headers() {
    return {
      Authorization: `Bearer ${this.token}`
    }
  }

  getVariables(cursor: string | null = null, direction: 'next' | 'previous' = 'next', args: { [key: string]: string } = {}) {
    const queryVariables: any = {
      query: 'stars:>0',
      first: 10,
      ...args
    };

    if (cursor) {
      if (direction === 'next') {
        queryVariables.after = cursor;
      } else {
        queryVariables.before = cursor;
        queryVariables.last = 10;
        delete queryVariables.first;
      }
    }

    return queryVariables;
  }


  query<T>(query: DocumentNode, variables?: { [key: string]: any }): Observable<T> {
    this._loading.next(true);

    return this._apollo.query<T>({
      query: query,
      variables: variables ? variables : this.getVariables(),
      context: {
        headers: this.headers
      }
    }).pipe(
      map(result => result.data),
      tap(() => this._loading.next(false)),
      catchError((e: ApolloError) => {
        this._loading.next(false);
        return throwError(() => new Error(e.networkError?.message));
      })
    );
  }


  validateToken() {
    return this.query(validateToken, {}).pipe(
      catchError((e: ApolloError) => {
        return throwError(() => new Error(e.networkError?.message));
      })
    )
  }
}
