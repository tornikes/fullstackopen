import { gql } from "@apollo/client";

export const ME = gql`
  query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            id
            rating
            repositoryId
            text
            user {
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy = CREATED_AT
    $orderDirection: OrderDirection = DESC
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          fullName
          stargazersCount
          reviewCount
          ratingAverage
          description
          forksCount
          language
          ownerAvatarUrl
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      stargazersCount
      reviewCount
      ratingAverage
      description
      forksCount
      language
      ownerAvatarUrl
      url
    }
  }
`;

export const GET_REVIEWS = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
