import { View, Text, Image, StyleSheet } from "react-native";
import TText from "./TText";

const styles = StyleSheet.create({
  outer: {
    paddingTop: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  coreInfo: {
    padding: 7,
    flexDirection: "row",
  },
  textInfo: {
    paddingLeft: 10,
  },
  bolded: {
    fontWeight: "bold",
  },
  centred: {
    textAlign: "center",
  },
  languageTag: {
    backgroundColor: "#0366d6",
    padding: 5,
    color: "white",
    alignSelf: "flex-start",
    borderRadius: 5,
  },
  hasMB: {
    marginBottom: 5,
  },
  statisticsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});

function RepositoryItem({ item }) {
  return (
    <View style={styles.outer}>
      <View style={styles.coreInfo}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.textInfo}>
          <TText fontWeight="bold" style={[styles.hasMB]}>
            {item.fullName}
          </TText>
          <TText style={[styles.hasMB]}>{item.description}</TText>
          <TText style={[styles.languageTag, styles.hasMB]}>
            {item.language}
          </TText>
        </View>
      </View>
      <View style={styles.statisticsBar}>
        <View>
          <TText fontWeight="bold" style={[styles.centred]}>
            {formatNumber(item.stargazersCount)}
          </TText>
          <Text>Stars</Text>
        </View>
        <View>
          <TText fontWeight="bold" style={[styles.centred]}>
            {formatNumber(item.forksCount)}
          </TText>
          <Text>Forks</Text>
        </View>
        <View>
          <TText fontWeight="bold" style={[styles.centred]}>
            {formatNumber(item.reviewCount)}
          </TText>
          <Text>Reviews</Text>
        </View>
        <View>
          <TText fontWeight="bold" style={[styles.centred]}>
            {formatNumber(item.ratingAverage)}
          </TText>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
}

function formatNumber(num) {
  if (num < 1000) {
    return num.toString();
  }

  const divided = num / 1000;
  return divided.toFixed(1) + "k";
}

export default RepositoryItem;
