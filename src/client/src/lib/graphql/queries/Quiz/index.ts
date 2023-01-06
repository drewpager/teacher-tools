import { gql } from "graphql-tag";

export const QUIZ = gql`
  query Quiz($id: ID!) {
    quiz(id: $id) {
      id
      title
      questions {
        __typename
        question
        answerOptions {
          __typename
          answerText
          isCorrect
        }
        answerType
      }
      creator
    }
  }
`;
