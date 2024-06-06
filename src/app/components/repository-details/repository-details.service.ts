import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRepoDetails, IRepository, ISearch} from "../../models/repositories.models";
import {GithubApiService} from "../../services/github-api.service";
import getRepositories from "../../queries/getRepositories";
import getRepositoryDetails from "../../queries/getRepositoryDetails";

@Injectable({
  providedIn: 'root'
})
export class RepositoryDetailsService {
  private _repositoryDetails: BehaviorSubject<IRepoDetails | null> = new BehaviorSubject<IRepoDetails | null>(null);
  private _repoOwner: { owner: string, name: string } = { owner: '', name: '' };

  constructor(private githubService: GithubApiService) { }

  get pagesAmount() {
    if (!this._repositoryDetails.value) return 0;
    return Math.ceil(this._repositoryDetails.value?.issues.totalCount / 10);
  }

  get $repositoryDetails() {
    return this._repositoryDetails.asObservable();
  }

  set repoOwner(owner: { owner: string, name: string }) {
    this._repoOwner = owner;
  }

  get repoOwner() {
    return this._repoOwner;
  }

  fetchNextPage() {
    const pageInfo = this._repositoryDetails.value?.issues.pageInfo;

    if (!pageInfo || !pageInfo.hasNextPage) return;
    this.get(this.githubService.getVariables(pageInfo.endCursor, 'next'))
  }

  fetchPreviousPage() {
    const pageInfo = this._repositoryDetails.value?.issues.pageInfo;

    if (!pageInfo || !pageInfo.hasPreviousPage) return;
    this.get(this.githubService.getVariables(pageInfo.startCursor, 'previous'))
  }

  get(variables?: any) {
    const defaultVariables = variables ? {...variables, ...this.repoOwner} : this.githubService.getVariables(null, 'next', this.repoOwner);

    this.githubService.query<IRepository>(getRepositoryDetails, defaultVariables).subscribe({
      next: (result) => this._repositoryDetails.next(result.repository)
    })
  }
}
