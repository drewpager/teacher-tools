import { gql } from 'graphql-tag';

export const QUIZ = gql`
  query Quiz($id: ID!) {
    quiz(id: $id) {
      id
      title
      questions {
        question
        correctAnswer
        answerOptions
        answerType
      }
      creator
    }
  }
`;