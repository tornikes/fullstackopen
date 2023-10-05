import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";

function useReviews(id) {
  const { data, loading, refetch } = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId: id,
    },
  });
  return { reviews: data?.repository?.reviews || null, loading, refetch };
}

export default useReviews;
