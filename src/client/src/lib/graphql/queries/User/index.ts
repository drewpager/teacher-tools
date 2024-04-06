import { gql } from "graphql-tag";

export const USER = gql`
  query User(
    $id: ID!
    $playlistsPage: Int!
    $lessonsPage: Int!
    $quizzesPage: Int!
    $articlesPage: Int!
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
          public
          premium
          level
          category
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
              pdf
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
              public
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
          public
          duration
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
          public
        }
        totalCount
      }
      articles(limit: $limit, page: $articlesPage) {
        total
        result {
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
        totalCount
      }
    }
  }
`;
