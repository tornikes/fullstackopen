import { View, StyleSheet, Pressable, Alert } from "react-native";
import TText from "./TText";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    paddingBottom: 15,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  actionButton: {
    width: "47%",
    backgroundColor: theme.colors.primary,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  warningButton: {
    backgroundColor: theme.colors.errorIndicator,
  },
});

function ReviewItem({ review, myReviewDisplay = false }) {
  const navigate = useNavigate();
  const deleteReview = useDeleteReview();

  function handleRequestDeletion(id) {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [{ text: "Cancel" }, { text: "DELETE", onPress: () => deleteReview(id) }]
    );
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewBar}>
        <View style={styles.ratingContainer}>
          <TText style={styles.rating}>{review.rating}</TText>
        </View>
        <View style={{ paddingTop: 5 }}>
          <TText style={{ fontWeight: "700" }}>
            {myReviewDisplay
              ? review.repositoryId.replace(/\./g, "/")
              : review.user.username}
          </TText>
          <TText>{formatDate(review.createdAt)}</TText>
        </View>
      </View>
      <View style={styles.reviewText}>
        <TText>{review.text}</TText>
      </View>
      {myReviewDisplay && (
        <>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => navigate(`/${review.repositoryId}`)}
              style={styles.actionButton}
            >
              <TText style={styles.buttonText}>View Repository</TText>
            </Pressable>
            <Pressable
              onPress={() => handleRequestDeletion(review.id)}
              style={[styles.actionButton, styles.warningButton]}
            >
              <TText style={styles.buttonText}>Delete Repository</TText>
            </Pressable>
          </View>
        </>
      )}
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

export default ReviewItem;
