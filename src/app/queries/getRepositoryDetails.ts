import {gql} from "apollo-angular";


export default gql`
  query GetRepositoryDetails($owner: String!, $name: String!, $first: Int, $last: Int, $after: String, $before: String) {
    repository(owner: $owner, name: $name) {
      name
      description
      primaryLanguage {
        name
      }
      createdAt
      url
      owner {
        login
        url
      }
      stargazers {
        totalCount
      }
      issues(first: $first, last: $last, after: $after, before: $before, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        edges {
          node {
            title
            createdAt
            url
            author {
              login
              url
            }
            state
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
            bodyText
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`
