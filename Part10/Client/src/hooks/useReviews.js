import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";

function useReviews(id) {
  const { data, loading, refetch, fetchMore, ...rest } = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId: id,
      first: 3,
    },
  });

  function handleFetchMore() {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: id,
        first: 2,
      },
    });
  }

  return {
    reviews: data?.repository?.reviews || null,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...rest,
  };
}

export default useReviews;
