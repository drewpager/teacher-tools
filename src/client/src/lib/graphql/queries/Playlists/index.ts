import { gql } from "graphql-tag";

export const ALL_PLAYLISTS = gql`
  query AllPlaylists($limit: Int!, $page: Int!) {
    allplaylists(limit: $limit, page: $page) {
      total
      result {
        id
        name
        creator
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
      }
    }
  }
`;
