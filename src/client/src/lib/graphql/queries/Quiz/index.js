"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUIZ = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.QUIZ = (0, graphql_tag_1.gql) `
  query Quiz($id: ID!) {
    quiz(id: $id) {
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
`;
