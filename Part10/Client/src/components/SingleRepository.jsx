import { useParams } from "react-router-native";
import { FlatList } from "react-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import useReviews from "../hooks/useReviews";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

function SingleRepository() {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);
  const { reviews, fetchMore } = useReviews(id);

  if (loading || !repository) {
    return null;
  }

  const reviewItems = reviews ? reviews.edges.map((edge) => edge.node) : [];

  function onEndReached() {
    fetchMore();
  }

  return (
    <FlatList
      data={reviewItems}
      renderItem={(reviewItem) => <ReviewItem review={reviewItem.item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showRedirectButton />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
    />
  );
}

export default SingleRepository;
