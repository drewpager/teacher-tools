"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_PLAN = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.UPDATE_PLAN = (0, graphql_tag_1.gql) `
  mutation UpdatePlan($input: LessonPlanInput!, $id: ID!) {
    updatePlan(input: $input, id: $id) {
      id
      name
      plan {
        __typename
        ... on Lesson {
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
        ... on Quiz {
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
      creator
      authorized
    }
  }
`;
