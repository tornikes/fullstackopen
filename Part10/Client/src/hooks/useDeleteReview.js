import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { GET_REVIEWS, ME } from "../graphql/queries";

function useDeleteReview() {
  const [mutate] = useMutation(DELETE_REVIEW);
  async function deleteReview(id) {
    await mutate({
      variables: {
        deleteReviewId: id,
      },
      refetchQueries: [ME],
    });
  }

  return deleteReview;
}

export default useDeleteReview;
