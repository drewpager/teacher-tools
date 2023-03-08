import { gql } from "graphql-tag";

export const LESSONS = gql`
  query Lessons($first: number, $cursor: ID!) {
    lessons(first: $first, cursor: $cursor) {
      edges {
        node {
          id
          category
          title
          meta
          video
          image
          startDate
          endDate
          creator
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
