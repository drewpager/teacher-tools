import { gql } from "graphql-tag";

export const LESSON = gql`
  query LessonTitle($title: String!) {
    lessonTitle(title: $title) {
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
`;
