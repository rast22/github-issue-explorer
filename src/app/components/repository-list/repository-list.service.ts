import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRepoDetails, ISearch, ISearchResult} from "../../models/repositories.models";
import {GithubApiService} from "../../services/github-api.service";
import getRepositories from "../../queries/getRepositories";

@Injectable({
  providedIn: 'root'
})
export class RepositoryListService {
  private _repositoriesList: BehaviorSubject<ISearchResult | null> = new BehaviorSubject<ISearchResult | null>(null);

  constructor(private githubService: GithubApiService) { }

  get pagesAmount() {
    if (!this._repositoriesList.value) return 0;
    return Math.ceil(this._repositoriesList.value?.repositoryCount / 10);
  }

  get $repositories() {
    return this._repositoriesList.asObservable();
  }

  fetchNextPage() {
    const pageInfo = this._repositoriesList.value?.pageInfo;

    if (!pageInfo || !pageInfo.hasNextPage) return;
    this.get(this.githubService.getVariables(pageInfo.endCursor, 'next'))
  }

  fetchPreviousPage() {
    const pageInfo = this._repositoriesList.value?.pageInfo;

    if (!pageInfo || !pageInfo.hasPreviousPage) return;
    this.get(this.githubService.getVariables(pageInfo.startCursor, 'previous'))
  }

  get(variables?: any) {
    this.githubService.query<ISearch>(getRepositories,variables).subscribe({
      next: (result) => {
        this._repositoriesList.next(result.search);
      }
    })
  }
}
