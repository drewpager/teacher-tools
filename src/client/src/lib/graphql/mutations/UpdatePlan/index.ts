import { gql } from 'graphql-tag';

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($input: LessonPlanInput!) {
    updatePlan(input: $input) {
      id
      name
      plan {
        __typename
        ... on Lesson {
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
        ... on Quiz {
          id
          title
          questions {
            question
            answerOptions {
              answerText
              isCorrect
            } 
            answerType
          }
          creator
        }
      }
      creator
      authorized
    }
  }
`;
