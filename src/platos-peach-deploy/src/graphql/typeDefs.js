"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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

  type AnswerOptions {
    answerText: String
    isCorrect: Boolean
  }

  type Questions {
    question: String
    answerOptions: [AnswerOptions]
    answerType: AnswerFormat
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

  type PlanItem {
    lesson: Lesson
    quiz: Quiz
  }

  type Playlist {
    id: ID
    name: String!
    plan: [LessonPlanUnion]!
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
    createQuiz(input: CreateQuizInput): Quiz!
    lessonPlan(input: LessonPlanInput): Playlist!
    updatePlan(input: LessonPlanInput, id: ID): Playlist!
    deleteLesson(id: ID): Boolean!
    deletePlaylist(id: ID): Boolean!
  }

  input LogInInput {
    code: String!
  }

  input CreateLessonInput {
    title: String!
    meta: String!
    category: [String!]!
    video: String!
    image: String!
    startDate: DateScalar!
    endDate: DateScalar!
  }

  input CreateQuizInput {
    title: String
    questions: [QuestionInput]
    creator: String
  }

  input QuestionInput {
    question: String
    answerOptions: [AnswerInput]
    answerType: AnswerFormat
  }

  input AnswerInput {
    answerText: String
    isCorrect: Boolean
  }

  input FullLessonInput {
    _id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: DateScalar
    endDate: DateScalar
    creator: String
  }

  input Answers {
    answerText: String
    isCorrect: Boolean
  }

  input QuizQuestions {
    question: String
    answerOptions: [Answers]
    answerType: AnswerFormat
  }

  input FullLessonQuiz {
    _id: ID
    title: String
    questions: [QuizQuestions]
    creator: String
  }

  input Plan {
    _id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: DateScalar
    endDate: DateScalar
    questions: [QuizQuestions]
    creator: String
  }

  input LessonPlanInput {
    name: String!
    creator: String!
    plan: [Plan]!
  }

  union LessonPlanUnion = Quiz | Lesson
`;
