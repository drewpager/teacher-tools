import { gql } from "graphql-tag";

export const USER = gql`
  query User(
    $id: ID!
    $playlistsPage: Int!
    $lessonsPage: Int!
    $quizzesPage: Int!
    $limit: Int!
  ) {
    user(id: $id) {
      id
      name
      avatar
      contact
      paymentId
      package {
        amount
        cadence
        status
        since
        trialEnd
      }
      bookmarks {
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
      playlists(limit: $limit, page: $playlistsPage) {
        total
        result {
          id
          name
          creator
          plan {
            __typename
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
              public
            }
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
