"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LESSON = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.LESSON = (0, graphql_tag_1.gql) `
  query Lesson($id: ID!) {
    lesson(id: $id) {
      id
      category
      title
      meta
      video
      image
      startDate
      endDate
    }
  }
`;
