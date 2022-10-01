import { gql } from "graphql-tag";

export const ALL_PLAYLISTS = gql`
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
