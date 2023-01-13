"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYLIST = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.PLAYLIST = (0, graphql_tag_1.gql) `
  query Playlist($id: ID!) {
    playlist(id: $id) {
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
`;
