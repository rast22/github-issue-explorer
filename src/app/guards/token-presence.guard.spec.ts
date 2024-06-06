import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { GithubApiService } from '../services/github-api.service';
import { tokenPresenceGuard } from './token-presence.guard';

describe('tokenPresenceGuard', () => {
  let mockGithubApiService: jasmine.SpyObj<GithubApiService>;

  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => tokenPresenceGuard(...guardParameters));

  beforeEach(() => {
    mockGithubApiService = jasmine.createSpyObj('GithubApiService', ['token']);

    TestBed.configureTestingModule({
      providers: [
        { provide: GithubApiService, useValue: mockGithubApiService }
      ]
    });

    Object.defineProperty(mockGithubApiService, 'token', {
      get: () => 'mock-token',
      set: () => {}
    });
  });

  it('should return true when token is present', () => {
    Object.defineProperty(mockGithubApiService, 'token', {
      get: () => 'mock-token',
      set: () => {}
    });
    const route: Route = {};
    const segments: UrlSegment[] = [];
    expect(executeGuard(route, segments)).toBe(true);
  });

  it('should return false when token is not present', () => {
    Object.defineProperty(mockGithubApiService, 'token', {
      get: () => null,
      set: () => {}
    });
    const route: Route = {};
    const segments: UrlSegment[] = [];
    expect(executeGuard(route, segments)).toBe(false);
  });
});
