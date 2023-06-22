import { gql } from "graphql-tag";

export const ADD_PAYMENT = gql`
  mutation AddPayment($id: ID!) {
    addPayment(id: $id) {
      paymentId
    }
  }
`;
