import { gql } from 'graphql-tag';

export const UPDATE_PLAN = gql`
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
