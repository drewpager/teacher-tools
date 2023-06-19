import { gql } from "graphql-tag";

export const ADD_PAYMENT = gql`
  mutation AddPayment(paymentId: String, viewer: String, user: UserInput) {
    addPayment(paymentId: $paymentId, viewer: $viewer, user: $user) {
      __typename
    }
  }
`;
