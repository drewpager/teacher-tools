import { gql } from "graphql-tag";

export const ALL_ARTICLES = gql`
  query AllArticles($limit: Int!, $page: Int!) {
    allarticles(limit: $limit, page: $page) {
      total
      result {
        id
        title
        creator
        content {
          blocks {
            key
            text
            type
            depth
            inlineStyleRanges {
              style
              offset
              length
            }
            entityRanges {
              offset
              length
              key
            }
          }
          entityMap {
            type
            mutability
            data {
              url
            }
          }
        }
        public
      }
    }
  }
`;
