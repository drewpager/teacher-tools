import { gql } from 'graphql-tag';

export const LOG_OUT = gql`
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