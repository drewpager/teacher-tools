import { gql } from 'graphql-tag';

export const PLAYLIST = gql`
  query Playlist($id: ID!) {
    playlist(id: $id) {
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
`;