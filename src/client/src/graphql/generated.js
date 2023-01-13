"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserLazyQuery = exports.useUserQuery = exports.UserDocument = exports.useAllQuizzesLazyQuery = exports.useAllQuizzesQuery = exports.AllQuizzesDocument = exports.useQuizLazyQuery = exports.useQuizQuery = exports.QuizDocument = exports.useAllPlaylistsLazyQuery = exports.useAllPlaylistsQuery = exports.AllPlaylistsDocument = exports.usePlaylistLazyQuery = exports.usePlaylistQuery = exports.PlaylistDocument = exports.useAllLessonsLazyQuery = exports.useAllLessonsQuery = exports.AllLessonsDocument = exports.useLessonLazyQuery = exports.useLessonQuery = exports.LessonDocument = exports.useAuthUrlLazyQuery = exports.useAuthUrlQuery = exports.AuthUrlDocument = exports.useUpdatePlanMutation = exports.UpdatePlanDocument = exports.useLogOutMutation = exports.LogOutDocument = exports.useLogInMutation = exports.LogInDocument = exports.useCreateQuizMutation = exports.CreateQuizDocument = exports.useLessonPlanMutation = exports.LessonPlanDocument = exports.useCreateLessonMutation = exports.CreateLessonDocument = exports.AnswerFormat = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
var AnswerFormat;
(function (AnswerFormat) {
    AnswerFormat["Multiplechoice"] = "MULTIPLECHOICE";
    AnswerFormat["Truefalse"] = "TRUEFALSE";
})(AnswerFormat = exports.AnswerFormat || (exports.AnswerFormat = {}));
exports.CreateLessonDocument = (0, client_1.gql) `
    mutation CreateLesson($input: CreateLessonInput!) {
  createLesson(input: $input) {
    id
  }
}
    `;
/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useCreateLessonMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateLessonDocument, options);
}
exports.useCreateLessonMutation = useCreateLessonMutation;
exports.LessonPlanDocument = (0, client_1.gql) `
    mutation LessonPlan($input: LessonPlanInput!) {
  lessonPlan(input: $input) {
    id
  }
}
    `;
/**
 * __useLessonPlanMutation__
 *
 * To run a mutation, you first call `useLessonPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLessonPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lessonPlanMutation, { data, loading, error }] = useLessonPlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useLessonPlanMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LessonPlanDocument, options);
}
exports.useLessonPlanMutation = useLessonPlanMutation;
exports.CreateQuizDocument = (0, client_1.gql) `
    mutation CreateQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
    id
  }
}
    `;
/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useCreateQuizMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateQuizDocument, options);
}
exports.useCreateQuizMutation = useCreateQuizMutation;
exports.LogInDocument = (0, client_1.gql) `
    mutation LogIn($input: LogInInput) {
  logIn(input: $input) {
    id
    token
    avatar
    hasPayment
    didRequest
  }
}
    `;
/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useLogInMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LogInDocument, options);
}
exports.useLogInMutation = useLogInMutation;
exports.LogOutDocument = (0, client_1.gql) `
    mutation LogOut {
  logOut {
    id
    token
    avatar
    hasPayment
    didRequest
  }
}
    `;
/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
function useLogOutMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LogOutDocument, options);
}
exports.useLogOutMutation = useLogOutMutation;
exports.UpdatePlanDocument = (0, client_1.gql) `
    mutation UpdatePlan($input: LessonPlanInput!, $id: ID!) {
  updatePlan(input: $input, id: $id) {
    id
    name
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
    creator
    authorized
  }
}
    `;
/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
function useUpdatePlanMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.UpdatePlanDocument, options);
}
exports.useUpdatePlanMutation = useUpdatePlanMutation;
exports.AuthUrlDocument = (0, client_1.gql) `
    query AuthUrl {
  authUrl
}
    `;
/**
 * __useAuthUrlQuery__
 *
 * To run a query within a React component, call `useAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
function useAuthUrlQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.AuthUrlDocument, options);
}
exports.useAuthUrlQuery = useAuthUrlQuery;
function useAuthUrlLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.AuthUrlDocument, options);
}
exports.useAuthUrlLazyQuery = useAuthUrlLazyQuery;
exports.LessonDocument = (0, client_1.gql) `
    query Lesson($id: ID!) {
  lesson(id: $id) {
    id
    category
    title
    meta
    video
    image
    startDate
    endDate
  }
}
    `;
/**
 * __useLessonQuery__
 *
 * To run a query within a React component, call `useLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useLessonQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.LessonDocument, options);
}
exports.useLessonQuery = useLessonQuery;
function useLessonLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.LessonDocument, options);
}
exports.useLessonLazyQuery = useLessonLazyQuery;
exports.AllLessonsDocument = (0, client_1.gql) `
    query AllLessons($limit: Int!, $page: Int!) {
  allLessons(limit: $limit, page: $page) {
    total
    result {
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
  }
}
    `;
/**
 * __useAllLessonsQuery__
 *
 * To run a query within a React component, call `useAllLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLessonsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
function useAllLessonsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.AllLessonsDocument, options);
}
exports.useAllLessonsQuery = useAllLessonsQuery;
function useAllLessonsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.AllLessonsDocument, options);
}
exports.useAllLessonsLazyQuery = useAllLessonsLazyQuery;
exports.PlaylistDocument = (0, client_1.gql) `
    query Playlist($id: ID!) {
  playlist(id: $id) {
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
}
    `;
/**
 * __usePlaylistQuery__
 *
 * To run a query within a React component, call `usePlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function usePlaylistQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PlaylistDocument, options);
}
exports.usePlaylistQuery = usePlaylistQuery;
function usePlaylistLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PlaylistDocument, options);
}
exports.usePlaylistLazyQuery = usePlaylistLazyQuery;
exports.AllPlaylistsDocument = (0, client_1.gql) `
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
  }
}
    `;
/**
 * __useAllPlaylistsQuery__
 *
 * To run a query within a React component, call `useAllPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPlaylistsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
function useAllPlaylistsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.AllPlaylistsDocument, options);
}
exports.useAllPlaylistsQuery = useAllPlaylistsQuery;
function useAllPlaylistsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.AllPlaylistsDocument, options);
}
exports.useAllPlaylistsLazyQuery = useAllPlaylistsLazyQuery;
exports.QuizDocument = (0, client_1.gql) `
    query Quiz($id: ID!) {
  quiz(id: $id) {
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
    `;
/**
 * __useQuizQuery__
 *
 * To run a query within a React component, call `useQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useQuizQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.QuizDocument, options);
}
exports.useQuizQuery = useQuizQuery;
function useQuizLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.QuizDocument, options);
}
exports.useQuizLazyQuery = useQuizLazyQuery;
exports.AllQuizzesDocument = (0, client_1.gql) `
    query AllQuizzes($limit: Int!, $page: Int!) {
  allquizzes(limit: $limit, page: $page) {
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
  }
}
    `;
/**
 * __useAllQuizzesQuery__
 *
 * To run a query within a React component, call `useAllQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllQuizzesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
function useAllQuizzesQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.AllQuizzesDocument, options);
}
exports.useAllQuizzesQuery = useAllQuizzesQuery;
function useAllQuizzesLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.AllQuizzesDocument, options);
}
exports.useAllQuizzesLazyQuery = useAllQuizzesLazyQuery;
exports.UserDocument = (0, client_1.gql) `
    query User($id: ID!, $playlistsPage: Int!, $lessonsPage: Int!, $quizzesPage: Int!, $limit: Int!) {
  user(id: $id) {
    id
    name
    avatar
    contact
    hasPayment
    playlists(limit: $limit, page: $playlistsPage) {
      total
      result {
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
/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      playlistsPage: // value for 'playlistsPage'
 *      lessonsPage: // value for 'lessonsPage'
 *      quizzesPage: // value for 'quizzesPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
function useUserQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.UserDocument, options);
}
exports.useUserQuery = useUserQuery;
function useUserLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.UserDocument, options);
}
exports.useUserLazyQuery = useUserLazyQuery;
