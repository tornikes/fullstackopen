import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy = CREATED_AT
    $orderDirection: OrderDirection = DESC
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
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
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
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
      }
    }
  }
`;
