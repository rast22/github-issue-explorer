import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {ApolloError, DocumentNode} from "@apollo/client";
import {Router} from "@angular/router";
import validateToken from "../queries/validateToken";

/**
 * Service to interact with the Github API
 */
@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  // State management
  private _token: string | null = null;
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _apollo: Apollo,
    private _router: Router) {  }

  // Observable to track loading state
  get $loading() {
    return this._loading.asObservable();
  }

  /**
   * Setter for token
   * @param token
   */
  set token(token: string | null) {
    this._token = token;
  }

  /**
   * Getter for token
   */
  get token(): string | null {
    return this._token;
  }

  logout() {
    this.token = null;
    this._apollo.client.resetStore(); // Clear Apollo cache
    this._router.navigate(['/'])
  }

  /**
   * Method to get headers for the GQL request
   * @returns {{ Authorization: string }}
 */
  get headers(): { Authorization: string } {
    return {
      Authorization: `Bearer ${this.token}`
    }
  }

  /**
   * Method to get build variables for the query
   * @param cursor {string | null}
   * @param direction {'next' | 'previous'}
   * @param args {{ [key: string]: string }
   */
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


  /**
   * Generic method to query the API
   * @param query {DocumentNode}
   * @param variables {{ [key: string]: any }
   */
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

  /**
   * Method to validate current token
   */
  validateToken() {
    return this.query(validateToken, {}).pipe(
      catchError((e: ApolloError) => {
        this.token = null;
        return throwError(() => new Error(e.networkError?.message));
      })
    )
  }
}
