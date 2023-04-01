import { gql } from "graphql-tag";

export const ADD_PAYMENT = gql`
  mutation AddPayment($input: $AddPaymentInfo!) {
    addPayment(input: $input) {
      id
    }
  }
`;
