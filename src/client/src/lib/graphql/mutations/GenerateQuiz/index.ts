import { gql } from "graphql-tag";

export const GENERATE_QUIZ = gql`
  mutation GenerateQuiz(
    $numMcQuestions: Int!
    $numTfQuestions: Int!
    $subject: String!
  ) {
    generateQuiz(
      numMCQuestions: $numMcQuestions
      numTFQuestions: $numTfQuestions
      subject: $subject
    )
  }
`;
