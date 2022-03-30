import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasPayment: Boolean
    didRequest: Boolean!
    playlists: [Playlist]
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasPayment: Boolean!
    playlists: [Playlist]
    lessons: [Lesson]
  }

  type Lesson {
    id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: Int
    endDate: Int
  }

  type Playlist {
    id: ID
    name: String!
    plan: [Lesson]!
    creator: String!
    authorized: Boolean
  }
  
  type Query {
    authUrl: String!
    user(id: ID!): String!
    lesson(id: ID!): Lesson!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }

  input LogInInput {
    code: String!
  }
`;