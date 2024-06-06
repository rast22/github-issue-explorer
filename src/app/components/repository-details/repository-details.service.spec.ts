import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GithubApiService } from '../../services/github-api.service';
import { RepositoryDetailsService } from './repository-details.service';
import { IRepoDetails } from '../../models/repositories.models';

describe('RepositoryDetailsService', () => {
  let service: RepositoryDetailsService;
  let githubApiService: jasmine.SpyObj<GithubApiService>;

  beforeEach(() => {
    const githubApiServiceSpy = jasmine.createSpyObj('GithubApiService', ['query', 'getVariables']);

    TestBed.configureTestingModule({
      providers: [
        RepositoryDetailsService,
        { provide: GithubApiService, useValue: githubApiServiceSpy }
      ]
    });

    service = TestBed.inject(RepositoryDetailsService);
    githubApiService = TestBed.inject(GithubApiService) as jasmine.SpyObj<GithubApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 pages when there are no repository details', () => {
    expect(service.pagesAmount).toBe(0);
  });

  it('should return correct number of pages when repository details are present', () => {
    const repoDetails: IRepoDetails = {
      name: 'test-repo',
      owner: {
        login: 'test-owner',
        url: 'https://github.com/test-owner',
      },
      createdAt: '2021-01-01',
      description: 'Description',
      url: 'https://github.com/test-owner/test-repo',
      stargazers: {
        totalCount: 10
      },
      primaryLanguage: {
        name: 'TypeScript',
      },
      issues: {
        totalCount: 25,
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: ''
        },
        edges: []
      }
    };

    (service as any)._repositoryDetails.next(repoDetails);
    expect(service.pagesAmount).toBe(3); // 25 issues / 10 per page = 2.5 pages, rounded up to 3
  });

  it('should not fetch the next page when there is no next page', () => {
    const pageInfo = {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: ''
    };
    const repoDetails: IRepoDetails = {
      name: 'test-repo',
      owner: {
        login: 'test-owner',
        url: 'https://github.com/test-owner',
      },
      createdAt: '2021-01-01',
      description: 'Description',
      url: 'https://github.com/test-owner/test-repo',
      stargazers: {
        totalCount: 10
      },
      primaryLanguage: {
        name: 'TypeScript',
      },
      issues: {
        totalCount: 25,
        pageInfo,
        edges: []
      }
    };

    (service as any)._repositoryDetails.next(repoDetails);
    service.fetchNextPage();

    expect(githubApiService.getVariables).not.toHaveBeenCalled();
    expect(githubApiService.query).not.toHaveBeenCalled();
  });

  it('should not fetch the previous page when there is no previous page', () => {
    const pageInfo = {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: ''
    };
    const repoDetails: IRepoDetails = {
      name: 'test-repo',
      owner: {
        login: 'test-owner',
        url: 'https://github.com/test-owner',
      },
      createdAt: '2021-01-01',
      description: 'Description',
      url: 'https://github.com/test-owner/test-repo',
      stargazers: {
        totalCount: 10
      },
      primaryLanguage: {
        name: 'TypeScript',
      },
      issues: {
        totalCount: 25,
        pageInfo,
        edges: []
      }
    };

    (service as any)._repositoryDetails.next(repoDetails);
    service.fetchPreviousPage();

    expect(githubApiService.getVariables).not.toHaveBeenCalled();
    expect(githubApiService.query).not.toHaveBeenCalled();
  });

  it('should call githubService.query with correct variables when get is called', () => {
    const variables = { query: 'test-query' };
    const repoDetails: IRepoDetails = {
      name: 'test-repo',
      owner: {
        login: 'test-owner',
        url: 'https://github.com/test-owner',
      },
      createdAt: '2021-01-01',
      description: 'Description',
      url: 'https://github.com/test-owner/test-repo',
      stargazers: {
        totalCount: 10
      },
      primaryLanguage: {
        name: 'TypeScript',
      },
      issues: {
        totalCount: 25,
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: ''
        },
        edges: []
      }
    };

    githubApiService.query.and.returnValue(of({ repository: repoDetails }));

    service.repoOwner = { owner: 'test-owner', name: 'test-name' };
    service.get(variables);

    expect(githubApiService.query).toHaveBeenCalledWith(jasmine.anything(), { ...variables, owner: 'test-owner', name: 'test-name' });
    service.$repositoryDetails.subscribe(details => {
      expect(details).toEqual(repoDetails);
    });
  });
});
