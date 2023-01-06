import { gql } from "graphql-tag";

export const PLAYLIST = gql`
  query Playlist($id: ID!) {
    playlist(id: $id) {
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
            __typename
            question
            answerOptions {
              __typename
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
