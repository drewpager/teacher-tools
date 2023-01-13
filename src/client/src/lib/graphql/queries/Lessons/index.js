"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_LESSONS = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.ALL_LESSONS = (0, graphql_tag_1.gql) `
  query AllLessons($limit: Int!, $page: Int!) {
    allLessons(limit: $limit, page: $page) {
      total
      result {
        id
        category
        title
        meta
        video
        image
        startDate
        endDate
        creator
      }
    }
  }
`;
