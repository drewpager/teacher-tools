import { gql } from "graphql-tag";

export const ALL_QUIZZES = gql`
  query AllQuizzes($limit: Int!, $page: Int!) {
    allquizzes(limit: $limit, page: $page) {
      total
      result {
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
  }
`;
