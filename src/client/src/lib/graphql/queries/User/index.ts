import { gql } from "graphql-tag";

export const USER = gql`
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
              correctAnswer
              answerOptions
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
            correctAnswer
            answerOptions
            answerType
          }
          creator
          }
        }
      }
    }
  }
`;
