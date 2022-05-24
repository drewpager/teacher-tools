import { gql } from 'graphql-tag';

export const LESSON_PLAN = gql`
  mutation LessonPlan($input: LessonPlanInput!) {
    lessonPlan(input: $input) {
      id
    }
  }
`;
