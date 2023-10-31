import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

function useRepositories(variables) {
  const { data, loading, fetchMore, ...rest } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  function handleFetchMore() {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  }

  return {
    repositories: data?.repositories || null,
    loading,
    fetchMore: handleFetchMore,
    ...rest,
  };
}

export default useRepositories;
