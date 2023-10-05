import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

function useRepository(id) {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId: id,
    },
  });
  return { repository: data?.repository || null, loading, refetch };
}

export default useRepository;
