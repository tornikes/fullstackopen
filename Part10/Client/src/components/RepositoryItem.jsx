import * as Linking from "expo-linking";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import TText from "./TText";

const styles = StyleSheet.create({
  outer: {
    paddingTop: 5,
    backgroundColor: "white",
  },
  outerWhenSingularView: {
    marginBottom: 10,
    paddingBottom: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  redirectButton: {
    backgroundColor: "#0275d8",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
});

function RepositoryItem({ item, showRedirectButton }) {
  return (
    <View
      style={[styles.outer, showRedirectButton && styles.outerWhenSingularView]}
      testID="repositoryItem"
    >
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
      {showRedirectButton && (
        <Pressable
          style={styles.buttonContainer}
          onPress={() => Linking.openURL(item.url)}
        >
          <View style={styles.redirectButton}>
            <TText style={styles.buttonText}>Open in Github</TText>
          </View>
        </Pressable>
      )}
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
