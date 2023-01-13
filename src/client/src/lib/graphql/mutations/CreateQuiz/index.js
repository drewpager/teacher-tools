"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_QUIZ = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.CREATE_QUIZ = (0, graphql_tag_1.gql) `
  mutation CreateQuiz($input: CreateQuizInput!) {
    createQuiz(input: $input) {
      id
    }
  }
`;
