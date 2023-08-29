import { gql } from "graphql-tag";

export const DELETE_ALL_BOOKMARKS = gql`
  mutation DeleteAllBookmarks($id: ID!) {
    deleteAllBookmarks(id: $id)
  }
`;
