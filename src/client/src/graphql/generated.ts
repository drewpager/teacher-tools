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

export type Lessons = {
  __typename?: 'Lessons';
  result: Array<Lesson>;
  total: Scalars['Int'];
};

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn: Viewer;
  logOut: Viewer;
};


export type MutationLogInArgs = {
  input?: InputMaybe<LogInInput>;
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
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String'];
  lesson: Lesson;
  user: User;
};


export type QueryLessonArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
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

export type LogInMutationVariables = Exact<{
  input?: InputMaybe<LogInInput>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasPayment?: boolean | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasPayment?: boolean | null, didRequest: boolean } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type LessonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LessonQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: number | null, endDate?: number | null } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
  playlistsPage: Scalars['Int'];
  lessonsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, contact: string, hasPayment: boolean, playlists?: { __typename?: 'Playlists', total: number, result: Array<{ __typename?: 'Playlist', id?: string | null, name: string, creator: string, plan: Array<{ __typename?: 'Lesson', id?: string | null, title?: string | null, video?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null } | null> }> } | null, lessons?: { __typename?: 'Lessons', total: number, result: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, startDate?: number | null, endDate?: number | null, creator?: string | null }> } | null } };


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