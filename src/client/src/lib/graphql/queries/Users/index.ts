import { gql } from "graphql-tag";

export const ALL_USERS = gql`
  query AllUsers($limit: Int!, $page: Int!) {
    allUsers(limit: $limit, page: $page) {
      totalCount
    }
  }
`;
