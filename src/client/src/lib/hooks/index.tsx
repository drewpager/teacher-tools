import { useQuery } from "@apollo/client";
import { LESSONS } from '../graphql/queries/AllLessons';

export default function useLessons() {
  const { data, loading, fetchMore } = useQuery(LESSONS, {
    notifyOnNetworkStatusChange: true
  });

  if (loading && !data.lessons) return { loading, lessons: [] }

  const loadMore = () => {
    return fetchMore({
      query: LESSONS,
      // notifyOnNetworkStatusChange,
      variables: {
        cursor: data.lessons.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.lessons.edges;
        const pageInfo = fetchMoreResult.lessons.pageInfo;

        return newEdges.length
          ? {
            lessons: {
              __typename: previousResult.lessons.__typename,
              edges: [...previousResult.lessons.edges, ...newEdges],
              pageInfo
            }
          }
          : previousResult
      }
    });
  }

  return {
    lessons: data.lessons.edges.map(({ node }: any) => node),
    hasNextPage: data.lessons.pageInfo.hasNextPage,
    loading,
    loadMore
  }
}