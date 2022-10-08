import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateScalar

  enum AnswerFormat {
    MULTIPLECHOICE
    TRUEFALSE
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasPayment: Boolean
    didRequest: Boolean!
    playlists: [Playlist]
    lessons: [Lesson]
    quizzes: [Quiz]
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasPayment: Boolean!
    playlists(limit: Int!, page: Int!): Playlists
    lessons(limit: Int!, page: Int!): Lessons
    quizzes(limit: Int!, page: Int!): Quizzes
  }

  type Lesson {
    id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: DateScalar
    endDate: DateScalar
    creator: String
  }

  type Questions {
    question: String
    correctAnswer: String
    answerOptions: [String]
    answerType: AnswerFormat!
  }

  type Quiz {
    id: ID
    title: String
    questions: [Questions!]!
    creator: String
  }

  type Lessons {
    total: Int!
    result: [Lesson!]!
    totalCount: Int!
  }

  type Playlist {
    id: ID
    name: String!
    plan: [LessonPlanUnion]
    creator: String!
    authorized: Boolean
  }

  type Playlists {
    total: Int!
    result: [Playlist!]!
    totalCount: Int!
  }

  type Quizzes {
    total: Int!
    result: [Quiz!]!
    totalCount: Int!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    lesson(id: ID!): Lesson!
    playlist(id: ID!): Playlist!
    allplaylists(limit: Int!, page: Int!): Playlists!
    allLessons(limit: Int!, page: Int!): Lessons!
    quiz(id: ID!): Quiz!
    allquizzes(limit: Int!, page: Int!): Quizzes!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    createLesson(input: CreateLessonInput): Lesson!
    lessonPlan(input: LessonPlanInput): Playlist!
    updatePlan(input: LessonPlanInput): Playlist!
    deleteLesson(id: ID): Boolean!
    deletePlaylist(id: ID): Boolean!
  }

  input LogInInput {
    code: String!
  }

  input CreateLessonInput {
    id: ID!
    title: String!
    meta: String!
    category: [String!]!
    video: String!
    image: String!
    startDate: DateScalar!
    endDate: DateScalar!
  }

  input FullLessonInput {
    id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: DateScalar
    endDate: DateScalar
    creator: String
  }

  input QuizQuestions {
    question: String
    correctAnswer: String
    answerOptions: [String]
    answerType: AnswerFormat!
  }

  input FullLessonQuiz {
    id: ID
    title: String
    questions: [QuizQuestions!]!
    creator: String
  }

  input FullPlanInput {
    lessons: FullLessonInput!
    quizzes: FullLessonQuiz
  }

  input LessonPlanInput {
    name: String!
    creator: String!
    plan: [FullPlanInput]!
  }

  union LessonPlanUnion = Quiz | Lesson
`;
