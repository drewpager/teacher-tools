import { gql } from "graphql-tag";

export const ARTICLE = gql`
  query Article($id: ID!) {
    article(id: $id) {
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
`;
