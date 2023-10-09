import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

function UsersReviews() {
  const { data, loading } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading || !data.me) {
    return null;
  }

  const reviews = data?.me?.reviews?.edges
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={(reviewItem) => (
        <ReviewItem review={reviewItem.item} myReviewDisplay />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

export default UsersReviews;
