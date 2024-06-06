interface ISearch {
  search: ISearchResult;
}

interface ISearchResult {
  edges: Array<INode<IRepo>>;
  pageInfo: IPageInfo;
  repositoryCount: number;
}

interface IRepo {
  name: string;
  createdAt: string;
  description: string;
  url: string;
  owner: IOwner;
  stargazers: IStargazers;
  primaryLanguage: ILanguage;
}

interface ILanguage {
  name?: string;
}

interface IStargazers {
  totalCount: number;
}

interface IOwner {
  login: string;
  url: string;
}

interface IPageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface IRepository {
  repository: IRepoDetails
}

interface IRepoDetails extends IRepo {
    issues: IIssueList;
}

interface IIssueList {
  totalCount: number;
  edges: Array<INode<IIssue>>;
  pageInfo: IPageInfo;
}

interface IIssue {
  title: string;
  body: string;
  createdAt: string;
  url: string;
  author: IOwner;
  labels: {
    edges: Array<INode<ILabel>>;
  };
  bodyText: string;
  state: string;
}

interface ILabel {
  name: string;
}

interface INode<T> {
  node: T;
}

export {
  ISearch,
  ISearchResult,
  IRepo,
  IPageInfo,
  IOwner,
  ILanguage,
  INode,
  IIssue,
  IIssueList,
  IStargazers,
  IRepoDetails,
  IRepository
}
