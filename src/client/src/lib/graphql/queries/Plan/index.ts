import { gql } from "graphql-tag";

export const PLAN = gql`
  query Plan($title: String!) {
    plan(title: $title) {
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
`;
