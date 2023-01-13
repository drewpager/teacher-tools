"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_PLAYLISTS = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.ALL_PLAYLISTS = (0, graphql_tag_1.gql) `
  query AllPlaylists($limit: Int!, $page: Int!) {
    allplaylists(limit: $limit, page: $page) {
      total
      result {
        id
        name
        creator
        plan {
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
      }
    }
  }
`;
