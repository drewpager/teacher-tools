import { gql } from 'graphql-tag';

export const QUIZ = gql`
  query Quiz($id: ID!) {
    quizzes(id: $id) {
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
`