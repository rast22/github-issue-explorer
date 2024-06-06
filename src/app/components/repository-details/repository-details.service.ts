import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRepoDetails, IRepository} from "../../models/repositories.models";
import {GithubApiService} from "../../services/github-api.service";
import getRepositoryDetails from "../../queries/getRepositoryDetails";

@Injectable({
  providedIn: 'root'
})
export class RepositoryDetailsService {
  // State management
  private _repositoryDetails: BehaviorSubject<IRepoDetails | null> = new BehaviorSubject<IRepoDetails | null>(null);
  private _repoOwner: { owner: string, name: string } = { owner: '', name: '' };

  constructor(private _githubService: GithubApiService) { }

  // Observable to track repository details
  get $repositoryDetails() {
    return this._repositoryDetails.asObservable();
  }

  /**
   * Setter for repository Owner
   * @param owner { owner: string, name: string }
   */
  set repoOwner(owner: { owner: string, name: string }) {
    this._repoOwner = owner;
  }

  /**
   * Getter for repository Owner
   */
  get repoOwner() {
    return this._repoOwner;
  }

  /**
   * Method to fetch repository details from the Github API
   * @param variables {[key: string]: string}
   */
  get(variables?: { [key: string]: string }) {
    const defaultVariables = variables ? {...variables, ...this.repoOwner} : this._githubService.getVariables(null, 'next', this.repoOwner);

    this._githubService.query<IRepository>(getRepositoryDetails, defaultVariables).subscribe({
      next: (result) => this._repositoryDetails.next(result.repository)
    })
  }

  //Pagination area

  fetchNextPage() {
    const pageInfo = this._repositoryDetails.value?.issues.pageInfo;

    if (!pageInfo || !pageInfo.hasNextPage) return;
    this.get(this._githubService.getVariables(pageInfo.endCursor, 'next'))
  }

  fetchPreviousPage() {
    const pageInfo = this._repositoryDetails.value?.issues.pageInfo;

    if (!pageInfo || !pageInfo.hasPreviousPage) return;
    this.get(this._githubService.getVariables(pageInfo.startCursor, 'previous'))
  }

  get pagesAmount() {
    if (!this._repositoryDetails.value) return 0;
    return Math.ceil(this._repositoryDetails.value?.issues.totalCount / 10);
  }

}
