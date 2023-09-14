import { gql } from "graphql-tag";

export const ARTICLE = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      creator
      content
      public
    }
  }
`;
