"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.USER = (0, graphql_tag_1.gql) `
  query User($id: ID!, $playlistsPage: Int!, $lessonsPage: Int!, $quizzesPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasPayment
      playlists(limit: $limit, page: $playlistsPage) {
        total
        result {
          id
          name
          creator
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
        }
        totalCount
      }
      lessons(limit: $limit, page: $lessonsPage) {
        total
        result {
          id
          category
          title
          meta
          video
          startDate
          endDate
          creator
        }
        totalCount
      }
      quizzes(limit: $limit, page: $quizzesPage) {
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
          totalCount
        }
      }
    }
`;
