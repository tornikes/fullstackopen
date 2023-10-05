import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

function useCreateReview() {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  async function createReview(review) {
    try {
      const response = await mutate({
        variables: {
          review,
        },
      });

      return response?.data?.createReview?.repositoryId;
    } catch (err) {
      console.log(err);
    }
  }

  return [createReview, result];
}

export default useCreateReview;
