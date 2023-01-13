"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_IN = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.LOG_IN = (0, graphql_tag_1.gql) `
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
