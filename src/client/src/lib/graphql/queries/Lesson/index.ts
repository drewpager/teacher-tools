import { gql } from "graphql-tag";

export const LESSON = gql`
  query Lesson($id: ID!) {
    lesson(id: $id) {
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
    }
  }
`;
