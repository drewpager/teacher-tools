import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Lesson {
    id: ID!
    category: [String!]!
    title: String!
    meta: String!
    video: String!
    image: String!
    startDate: Int!
    endDate: Int!
  }

  type Query {
    lessons: [Lesson!]!
  }

  type Mutation {
    deleteLesson(id: ID!): Lesson!
  }

  type Lesson {
    title: String!
  }
`;