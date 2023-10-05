import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import TText from "./TText";
import useReviews from "../hooks/useReviews";
import ItemSeparator from "./ItemSeparator";

import theme from "../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  reviewBar: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 5,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
  },
  rating: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  reviewText: {
    paddingLeft: 67,
    paddingRight: 5,
    paddingBottom: 12,
  },
});

function SingleRepository() {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);
  const { reviews } = useReviews(id);

  if (loading || !repository) {
    return null;
  }

  const reviewItems = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewItems}
      renderItem={(reviewItem) => <ReviewItem review={reviewItem.item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showRedirectButton />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

function ReviewItem({ review }) {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewBar}>
        <View style={styles.ratingContainer}>
          <TText style={styles.rating}>{review.rating}</TText>
        </View>
        <View style={{ paddingTop: 5 }}>
          <TText style={{ fontWeight: "700" }}>{review.user.username}</TText>
          <TText>{formatDate(review.createdAt)}</TText>
        </View>
      </View>
      <View style={styles.reviewText}>
        <TText>{review.text}</TText>
      </View>
    </View>
  );
}

function padDate(amount) {
  return amount.toString().padStart(2, "0");
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return `${padDate(date.getDate())}.${padDate(
    date.getMonth()
  )}.${date.getFullYear()}`;
}

export default SingleRepository;
