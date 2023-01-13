"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_LESSON = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.CREATE_LESSON = (0, graphql_tag_1.gql) `
  mutation CreateLesson($input: CreateLessonInput!) {
    createLesson(input: $input) {
      id
    }
  }
`;
