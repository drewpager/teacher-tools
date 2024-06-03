import { gql } from "graphql-tag";

export const ALL_LESSONS = gql`
  query AllLessons($limit: Int!, $page: Int!) {
    allLessons(limit: $limit, page: $page) {
      total
      result {
        id
        category
        title
        meta
        video
        image
        startDate
        endDate
        creator
        public
        duration
        script
      }
    }
  }
`;
