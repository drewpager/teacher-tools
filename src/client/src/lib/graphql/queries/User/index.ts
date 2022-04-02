import { gql } from 'graphql-tag';

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasPayment
    }
  }
`