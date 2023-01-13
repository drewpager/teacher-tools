"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LESSON_PLAN = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.LESSON_PLAN = (0, graphql_tag_1.gql) `
  mutation LessonPlan($input: LessonPlanInput!) {
    lessonPlan(input: $input) {
      id
    }
  }
`;
