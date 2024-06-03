import { gql } from "graphql-tag";

export const RELATED_PLANS = gql`
  query RelatedPlans($id: ID!) {
    relatedPlans(id: $id) {
      plan {
        ... on Article {
          title
          public
          pdf
          id
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
          public
          duration
          script
        }
      }
      name
      id
      creator
      public
      premium
      level
    }
  }
`;
