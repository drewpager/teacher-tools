"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_QUIZZES = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.ALL_QUIZZES = (0, graphql_tag_1.gql) `
  query AllQuizzes($limit: Int!, $page: Int!) {
    allquizzes(limit: $limit, page: $page) {
      total
      result {
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
  }
`;
