import { TestBed } from '@angular/core/testing';

import { GithubApiService } from './github-api.service';
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {ApolloQueryResult, DocumentNode} from "@apollo/client";
import {of, throwError} from "rxjs";


describe('GithubApiService', () => {
  let service: GithubApiService;
  let apollo: jasmine.SpyObj<Apollo>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const apolloSpy = jasmine.createSpyObj('Apollo', ['query']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        GithubApiService,
        { provide: Apollo, useValue: apolloSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(GithubApiService);
    apollo = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the token', () => {
    service.token = 'test-token';
    expect(service.token).toBe('test-token');
  });

  it('should logout and navigate to root', () => {
    service.logout();
    expect(service.token).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return loading observable', () => {
    service.$loading.subscribe(loading => {
      expect(loading).toBe(false);
    });
  });

  it('should perform query with variables', (done) => {
    const testQuery: DocumentNode = {} as DocumentNode; // Dummy DocumentNode
    const queryResult: ApolloQueryResult<any> = { data: {}, loading: false, networkStatus: 7 };
    apollo.query.and.returnValue(of(queryResult));

    service.query<any>(testQuery, { key: 'value' }).subscribe(result => {
      expect(result).toEqual({});
      done();
    });
  });

  it('should handle error in validateToken', (done) => {
    const validateTokenQuery: DocumentNode = {} as DocumentNode; // Dummy DocumentNode
    const apolloError = { networkError: { message: 'Network error' } } as any;
    apollo.query.and.returnValue(throwError(() => apolloError));

    service.validateToken().subscribe({
      error: (error) => {
        expect(error.message).toBe('Network error');
        done();
      }
    });
  });

  it('should validate token successfully', (done) => {
    const validateTokenQuery: DocumentNode = {} as DocumentNode; // Dummy DocumentNode
    const queryResult: ApolloQueryResult<any> = { data: {}, loading: false, networkStatus: 7 };
    apollo.query.and.returnValue(of(queryResult));

    service.validateToken().subscribe(result => {
      expect(result).toEqual({});
      done();
    });
  });
});
