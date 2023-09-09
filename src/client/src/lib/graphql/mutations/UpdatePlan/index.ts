import { gql } from "graphql-tag";

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($input: LessonPlanInput, $id: ID) {
    updatePlan(input: $input, id: $id) {
      id
    }
  }
`;
