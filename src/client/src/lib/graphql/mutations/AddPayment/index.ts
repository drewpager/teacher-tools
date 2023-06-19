import { gql } from "graphql-tag";

export const ADD_PAYMENT = gql`
  mutation AddPayment(input: AddPaymentInput) {
    addPayment(input: $input) {
      paymentId
    }
  }
`;
