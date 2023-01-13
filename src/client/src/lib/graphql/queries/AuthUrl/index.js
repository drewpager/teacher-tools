"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_URL = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.AUTH_URL = (0, graphql_tag_1.gql) `
  query AuthUrl {
    authUrl
  }
`;
