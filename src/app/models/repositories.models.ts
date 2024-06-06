// Interfaces for Search Functionality
interface ISearch {
  readonly search: ISearchResult;
}

interface ISearchResult {
  readonly edges: Array<INode<IRepo>>;
  readonly pageInfo: IPageInfo;
  readonly repositoryCount: number;
}

// Interface for Repository Details
interface IRepo {
  readonly name: string;
  readonly createdAt: string;
  readonly description: string;
  readonly url: string;
  readonly owner: IOwner;
  readonly stargazers: IStargazers;
  readonly primaryLanguage: ILanguage;
}

// Interface for Repository Language
interface ILanguage {
  readonly name: string | '';
}

// Interface for Stargazers
interface IStargazers {
  readonly totalCount: number;
}

// Interface for Owner Information
interface IOwner {
  readonly login: string;
  readonly url: string;
}

// Interface for Pagination Information
interface IPageInfo {
  readonly endCursor: string;
  readonly startCursor: string;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

// Interface for Repository with Detailed Information
interface IRepository {
  readonly repository: IRepoDetails;
}

interface IRepoDetails extends IRepo {
  readonly issues: IIssueList;
}

// Interface for Issue List
interface IIssueList {
  readonly totalCount: number;
  readonly edges: Array<INode<IIssue>>;
  readonly pageInfo: IPageInfo;
}

// Interface for Issue Details
interface IIssue {
  readonly title: string;
  readonly body: string;
  readonly createdAt: string;
  readonly url: string;
  readonly author: IOwner;
  readonly labels: {
    readonly edges: Array<INode<ILabel>>;
  };
  readonly bodyText: string;
  readonly state: string;
}

// Interface for Label Information
interface ILabel {
  readonly name: string;
}

// Generic Interface for Node
interface INode<T> {
  readonly node: T;
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
