import { gql } from 'graphql-tag';

export const CREATE_QUIZ = gql`
  mutation CreateQuiz($input: CreateQuizInput!) {
    createQuiz(input: $input) {
      id
    }
  }
`;