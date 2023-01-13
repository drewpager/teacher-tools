"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_OUT = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.LOG_OUT = (0, graphql_tag_1.gql) `
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
