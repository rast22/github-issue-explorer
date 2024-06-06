import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GithubApiService } from '../../services/github-api.service';
import { RepositoryListService } from './repository-list.service';
import { ISearch, ISearchResult } from '../../models/repositories.models';

describe('RepositoryListService', () => {
  let service: RepositoryListService;
  let githubApiService: jasmine.SpyObj<GithubApiService>;

  beforeEach(() => {
    const githubApiServiceSpy = jasmine.createSpyObj('GithubApiService', ['query', 'getVariables']);

    TestBed.configureTestingModule({
      providers: [
        RepositoryListService,
        { provide: GithubApiService, useValue: githubApiServiceSpy }
      ]
    });

    service = TestBed.inject(RepositoryListService);
    githubApiService = TestBed.inject(GithubApiService) as jasmine.SpyObj<GithubApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 pages when there are no repositories', () => {
    expect(service.pagesAmount).toBe(0);
  });

  it('should return correct number of pages when repositories are present', () => {
    const searchResult: ISearchResult = {
      repositoryCount: 25,
      edges: [],
      pageInfo: {
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: ''
      }
    };

    (service as any)._repositoriesList.next(searchResult); // Set private variable for test
    expect(service.pagesAmount).toBe(3); // 25 repositories / 10 per page = 2.5 pages, rounded up to 3
  });

  it('should fetch the next page when there is a next page', () => {
    const pageInfo = {
      endCursor: 'endCursor',
      hasNextPage: true,
      hasPreviousPage: false,
      startCursor: ''
    };
    const searchResult: ISearchResult = {
      repositoryCount: 25,
      edges: [],
      pageInfo
    };

    (service as any)._repositoriesList.next(searchResult);

    const variables = { after: 'endCursor', first: 10, query: 'stars:>0' };
    githubApiService.getVariables.and.returnValue(variables);
    githubApiService.query.and.returnValue(of({ search: searchResult }));

    service.fetchNextPage();

    expect(githubApiService.getVariables).toHaveBeenCalledWith('endCursor', 'next');
    expect(githubApiService.query).toHaveBeenCalledWith(jasmine.anything(), variables);
  });

  it('should not fetch the next page when there is no next page', () => {
    const pageInfo = {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: ''
    };
    const searchResult: ISearchResult = {
      repositoryCount: 25,
      edges: [],
      pageInfo
    };

    (service as any)._repositoriesList.next(searchResult);
    service.fetchNextPage();

    expect(githubApiService.getVariables).not.toHaveBeenCalled();
    expect(githubApiService.query).not.toHaveBeenCalled();
  });

  it('should fetch the previous page when there is a previous page', () => {
    const pageInfo = {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: true,
      startCursor: 'startCursor'
    };
    const searchResult: ISearchResult = {
      repositoryCount: 25,
      edges: [],
      pageInfo
    };

    (service as any)._repositoriesList.next(searchResult);

    const variables = { before: 'startCursor', last: 10, query: 'stars:>0' };
    githubApiService.getVariables.and.returnValue(variables);
    githubApiService.query.and.returnValue(of({ search: searchResult }));

    service.fetchPreviousPage();

    expect(githubApiService.getVariables).toHaveBeenCalledWith('startCursor', 'previous');
    expect(githubApiService.query).toHaveBeenCalledWith(jasmine.anything(), variables);
  });

  it('should not fetch the previous page when there is no previous page', () => {
    const pageInfo = {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: ''
    };
    const searchResult: ISearchResult = {
      repositoryCount: 25,
      edges: [],
      pageInfo
    };

    (service as any)._repositoriesList.next(searchResult);
    service.fetchPreviousPage();

    expect(githubApiService.getVariables).not.toHaveBeenCalled();
    expect(githubApiService.query).not.toHaveBeenCalled();
  });

  it('should call githubService.query with correct variables when get is called', () => {
    const variables = { query: 'test-query' };
    const searchResult: ISearchResult = {
      repositoryCount: 25,
      edges: [],
      pageInfo: {
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: ''
      }
    };

    githubApiService.query.and.returnValue(of({ search: searchResult }));

    service.get(variables);

    expect(githubApiService.query).toHaveBeenCalledWith(jasmine.anything(), variables);
    service.$repositories.subscribe(repositories => {
      expect(repositories).toEqual(searchResult);
    });
  });
});
