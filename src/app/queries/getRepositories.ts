import {gql} from "apollo-angular";


export default gql`
  query GetRepositories($query: String!, $first: Int, $last: Int, $after: String, $before: String) {
    search(query: $query, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            description
            primaryLanguage {
              name
            }
            createdAt
            url
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      repositoryCount
    }
  }
`
