import { gql } from "graphql-tag";

export const LESSON_PLAN = gql`
  mutation LessonPlan($input: LessonPlanInput!, $viewerId: ID!) {
    lessonPlan(input: $input, viewerId: $viewerId) {
      id
    }
  }
`;
