import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type CreateLessonInput = {
  category: Array<Scalars['String']>;
  endDate: Scalars['Int'];
  id: Scalars['ID'];
  image: Scalars['String'];
  meta: Scalars['String'];
  startDate: Scalars['Int'];
  title: Scalars['String'];
  video: Scalars['String'];
};

export type FullLessonInput = {
  category?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  creator?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<Scalars['String']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  creator?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type LessonPlanInput = {
  creator: Scalars['String'];
  name: Scalars['String'];
  plan: Array<FullLessonInput>;
};

export type Lessons = {
  __typename?: 'Lessons';
  result: Array<Lesson>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLesson: Lesson;
  deleteLesson: Scalars['Boolean'];
  deletePlaylist: Scalars['Boolean'];
  lessonPlan: Playlist;
  logIn: Viewer;
  logOut: Viewer;
  updatePlan: Playlist;
};


export type MutationCreateLessonArgs = {
  input?: InputMaybe<CreateLessonInput>;
};


export type MutationDeleteLessonArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeletePlaylistArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationLessonPlanArgs = {
  input?: InputMaybe<LessonPlanInput>;
};


export type MutationLogInArgs = {
  input?: InputMaybe<LogInInput>;
};


export type MutationUpdatePlanArgs = {
  input?: InputMaybe<UpdatePlanInput>;
};

export type Playlist = {
  __typename?: 'Playlist';
  authorized?: Maybe<Scalars['Boolean']>;
  creator: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  plan: Array<Maybe<Lesson>>;
};

export type Playlists = {
  __typename?: 'Playlists';
  result: Array<Playlist>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allLessons: Lessons;
  allplaylists: Playlists;
  authUrl: Scalars['String'];
  lesson: Lesson;
  playlist: Playlist;
  user: User;
};


export type QueryAllLessonsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryAllplaylistsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryLessonArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type UpdatePlanInput = {
  authorized?: InputMaybe<Scalars['Boolean']>;
  creator?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Array<InputMaybe<FullLessonInput>>>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  contact: Scalars['String'];
  hasPayment: Scalars['Boolean'];
  id: Scalars['ID'];
  lessons?: Maybe<Lessons>;
  name: Scalars['String'];
  playlists?: Maybe<Playlists>;
};


export type UserLessonsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserPlaylistsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Viewer = {
  __typename?: 'Viewer';
  avatar?: Maybe<Scalars['String']>;
  didRequest: Scalars['Boolean'];
  hasPayment?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  playlists?: Maybe<Array<Maybe<Playlist>>>;
  token?: Maybe<Scalars['String']>;
};

export type CreateLessonMutationVariables = Exact<{
  input: CreateLessonInput;
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename?: 'Lesson', id?: string | null } };

export type LessonPlanMutationVariables = Exact<{
  input: LessonPlanInput;
}>;


export type LessonPlanMutation = { __typename?: 'Mutation', lessonPlan: { __typename?: 'Playlist', id?: string | null } };

export type LogInMutationVariables = Exact<{
  input?: InputMaybe<LogInInput>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasPayment?: boolean | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasPayment?: boolean | null, didRequest: boolean } };

export type UpdatePlanMutationVariables = Exact<{
  input: UpdatePlanInput;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Playlist', id?: string | null, name: string, creator: string, authorized?: boolean | null, plan: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null } | null> } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type LessonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LessonQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: number | null, endDate?: number | null } };

export type AllLessonsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllLessonsQuery = { __typename?: 'Query', allLessons: { __typename?: 'Lessons', total: number, result: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null }> } };

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id?: string | null, name: string, creator: string, plan: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null } | null> } };

export type AllPlaylistsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllPlaylistsQuery = { __typename?: 'Query', allplaylists: { __typename?: 'Playlists', total: number, result: Array<{ __typename?: 'Playlist', id?: string | null, name: string, creator: string, plan: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null } | null> }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
  playlistsPage: Scalars['Int'];
  lessonsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, contact: string, hasPayment: boolean, playlists?: { __typename?: 'Playlists', total: number, totalCount: number, result: Array<{ __typename?: 'Playlist', id?: string | null, name: string, creator: string, plan: Array<{ __typename?: 'Lesson', id?: string | null, title?: string | null, video?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null } | null> }> } | null, lessons?: { __typename?: 'Lessons', total: number, totalCount: number, result: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null }> } | null } };


export const CreateLessonDocument = gql`
    mutation CreateLesson($input: CreateLessonInput!) {
  createLesson(input: $input) {
    id
  }
}
    `;
export type CreateLessonMutationFn = Apollo.MutationFunction<CreateLessonMutation, CreateLessonMutationVariables>;

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
export function useCreateLessonMutation(baseOptions?: Apollo.MutationHookOptions<CreateLessonMutation, CreateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLessonMutation, CreateLessonMutationVariables>(CreateLessonDocument, options);
      }
export type CreateLessonMutationHookResult = ReturnType<typeof useCreateLessonMutation>;
export type CreateLessonMutationResult = Apollo.MutationResult<CreateLessonMutation>;
export type CreateLessonMutationOptions = Apollo.BaseMutationOptions<CreateLessonMutation, CreateLessonMutationVariables>;
export const LessonPlanDocument = gql`
    mutation LessonPlan($input: LessonPlanInput!) {
  lessonPlan(input: $input) {
    id
  }
}
    `;
export type LessonPlanMutationFn = Apollo.MutationFunction<LessonPlanMutation, LessonPlanMutationVariables>;

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
export function useLessonPlanMutation(baseOptions?: Apollo.MutationHookOptions<LessonPlanMutation, LessonPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LessonPlanMutation, LessonPlanMutationVariables>(LessonPlanDocument, options);
      }
export type LessonPlanMutationHookResult = ReturnType<typeof useLessonPlanMutation>;
export type LessonPlanMutationResult = Apollo.MutationResult<LessonPlanMutation>;
export type LessonPlanMutationOptions = Apollo.BaseMutationOptions<LessonPlanMutation, LessonPlanMutationVariables>;
export const LogInDocument = gql`
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
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

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
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
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
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

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
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const UpdatePlanDocument = gql`
    mutation UpdatePlan($input: UpdatePlanInput!) {
  updatePlan(input: $input) {
    id
    name
    plan {
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
    creator
    authorized
  }
}
    `;
export type UpdatePlanMutationFn = Apollo.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;

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
 *   },
 * });
 */
export function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlanMutation, UpdatePlanMutationVariables>(UpdatePlanDocument, options);
      }
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const AuthUrlDocument = gql`
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
export function useAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
      }
export function useAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
        }
export type AuthUrlQueryHookResult = ReturnType<typeof useAuthUrlQuery>;
export type AuthUrlLazyQueryHookResult = ReturnType<typeof useAuthUrlLazyQuery>;
export type AuthUrlQueryResult = Apollo.QueryResult<AuthUrlQuery, AuthUrlQueryVariables>;
export const LessonDocument = gql`
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
export function useLessonQuery(baseOptions: Apollo.QueryHookOptions<LessonQuery, LessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LessonQuery, LessonQueryVariables>(LessonDocument, options);
      }
export function useLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LessonQuery, LessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LessonQuery, LessonQueryVariables>(LessonDocument, options);
        }
export type LessonQueryHookResult = ReturnType<typeof useLessonQuery>;
export type LessonLazyQueryHookResult = ReturnType<typeof useLessonLazyQuery>;
export type LessonQueryResult = Apollo.QueryResult<LessonQuery, LessonQueryVariables>;
export const AllLessonsDocument = gql`
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
export function useAllLessonsQuery(baseOptions: Apollo.QueryHookOptions<AllLessonsQuery, AllLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLessonsQuery, AllLessonsQueryVariables>(AllLessonsDocument, options);
      }
export function useAllLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLessonsQuery, AllLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLessonsQuery, AllLessonsQueryVariables>(AllLessonsDocument, options);
        }
export type AllLessonsQueryHookResult = ReturnType<typeof useAllLessonsQuery>;
export type AllLessonsLazyQueryHookResult = ReturnType<typeof useAllLessonsLazyQuery>;
export type AllLessonsQueryResult = Apollo.QueryResult<AllLessonsQuery, AllLessonsQueryVariables>;
export const PlaylistDocument = gql`
    query Playlist($id: ID!) {
  playlist(id: $id) {
    id
    name
    creator
    plan {
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
export function usePlaylistQuery(baseOptions: Apollo.QueryHookOptions<PlaylistQuery, PlaylistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistQuery, PlaylistQueryVariables>(PlaylistDocument, options);
      }
export function usePlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistQuery, PlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistQuery, PlaylistQueryVariables>(PlaylistDocument, options);
        }
export type PlaylistQueryHookResult = ReturnType<typeof usePlaylistQuery>;
export type PlaylistLazyQueryHookResult = ReturnType<typeof usePlaylistLazyQuery>;
export type PlaylistQueryResult = Apollo.QueryResult<PlaylistQuery, PlaylistQueryVariables>;
export const AllPlaylistsDocument = gql`
    query AllPlaylists($limit: Int!, $page: Int!) {
  allplaylists(limit: $limit, page: $page) {
    total
    result {
      id
      name
      creator
      plan {
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
export function useAllPlaylistsQuery(baseOptions: Apollo.QueryHookOptions<AllPlaylistsQuery, AllPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPlaylistsQuery, AllPlaylistsQueryVariables>(AllPlaylistsDocument, options);
      }
export function useAllPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPlaylistsQuery, AllPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPlaylistsQuery, AllPlaylistsQueryVariables>(AllPlaylistsDocument, options);
        }
export type AllPlaylistsQueryHookResult = ReturnType<typeof useAllPlaylistsQuery>;
export type AllPlaylistsLazyQueryHookResult = ReturnType<typeof useAllPlaylistsLazyQuery>;
export type AllPlaylistsQueryResult = Apollo.QueryResult<AllPlaylistsQuery, AllPlaylistsQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!, $playlistsPage: Int!, $lessonsPage: Int!, $limit: Int!) {
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
          id
          title
          video
          startDate
          endDate
          creator
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
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;