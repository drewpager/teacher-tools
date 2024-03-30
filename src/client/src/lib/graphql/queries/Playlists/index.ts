import { gql } from "graphql-tag";

export const ALL_PLAYLISTS = gql`
  query AllPlaylists($limit: Int!, $page: Int!) {
    allplaylists(limit: $limit, page: $page) {
      total
      result {
        id
        name
        creator
        public
        premium
        level
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
            public
            duration
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
          ... on Article {
            id
            title
            creator
            content {
              blocks {
                key
                text
                type
                depth
                inlineStyleRanges {
                  style
                  offset
                  length
                }
                entityRanges {
                  offset
                  length
                  key
                }
              }
              entityMap {
                type
                mutability
                data {
                  src
                  width
                  alignment
                  height
                  url
                  targetOption
                }
              }
            }
            pdf
            public
          }
        }
      }
    }
  }
`;
