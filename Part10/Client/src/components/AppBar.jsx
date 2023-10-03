import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";
import { ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appbarBackground,
    paddingVertical: 10,
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
  navigationItem: {
    marginRight: 10,
  },
});

function AppBar() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.navigationItem}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.navigationItem}>
          <Link to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default AppBar;
