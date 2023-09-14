import { gql } from "graphql-tag";

export const ALL_ARTICLES = gql`
  query AllArticles($limit: Int!, $page: Int!) {
    allarticles(limit: $limit, page: $page) {
      total
      result {
        id
        title
        creator
        content
        public
      }
    }
  }
`;
