import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { ISearch, ISearchResult } from "../../models/repositories.models";
import {GithubApiService} from "../../services/github-api.service";
import getRepositories from "../../queries/getRepositories";

/**
 * Repository list service. Used to fetch repositories from the Github API and store the state
 */
@Injectable({
  providedIn: 'root'
})
export class RepositoryListService {
  // State management
  private _repositoriesList: BehaviorSubject<ISearchResult | null> = new BehaviorSubject<ISearchResult | null>(null);

  constructor(private _githubService: GithubApiService) { }

  // Observable to track repositories list
  get $repositories() {
    return this._repositoriesList.asObservable();
  }

  /**
   * Method to fetch repositories from the Github API
   * @param variables {[key: string]: string}
   */
  get(variables?: {[key: string]: string}) {
    this._githubService.query<ISearch>(getRepositories,variables).subscribe({
      next: (result) => {
        this._repositoriesList.next(result.search);
      }
    })
  }

  // Pagination  area

  fetchNextPage() {
    const pageInfo = this._repositoriesList.value?.pageInfo;

    if (!pageInfo || !pageInfo.hasNextPage) return;
    this.get(this._githubService.getVariables(pageInfo.endCursor, 'next'))
  }

  fetchPreviousPage() {
    const pageInfo = this._repositoriesList.value?.pageInfo;

    if (!pageInfo || !pageInfo.hasPreviousPage) return;
    this.get(this._githubService.getVariables(pageInfo.startCursor, 'previous'))
  }

  get pagesAmount() {
    if (!this._repositoriesList.value) return 0;
    return Math.ceil(this._repositoriesList.value?.repositoryCount / 10);
  }
}
