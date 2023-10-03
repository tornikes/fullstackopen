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
  query {
    repositories {
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
