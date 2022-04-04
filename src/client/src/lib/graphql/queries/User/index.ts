import { gql } from 'graphql-tag';

export const USER = gql`
  query User($id: ID!, $playlistsPage: Int!, $lessonsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasPayment
      playlists(limit: $limit, page: $playlistsPage) {
        total
        result {
          id
          name
          plan {
            id
            title
            video
            startDate
            endDate
          }
        }
      }
      lessons(limit: $limit, page: $lessonsPage) {
        total
        result {
          id
          category
          title
          meta
          video
          startDate
          endDate
          creator
        }
      }
    }
  }
`