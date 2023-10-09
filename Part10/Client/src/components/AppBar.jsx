import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link, useNavigate } from "react-router-native";
import { ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

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
  const { data, loading } = useQuery(ME);
  const navigate = useNavigate();
  const isLoggedIn = data?.me && !loading;

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  async function handleLogout() {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.navigationItem}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        {isLoggedIn && (
          <>
            <Pressable style={styles.navigationItem}>
              <Link to="/create">
                <Text style={styles.text}>Create a Review</Text>
              </Link>
            </Pressable>
            <Pressable style={styles.navigationItem}>
              <Link to="/reviews">
                <Text style={styles.text}>My Reviews</Text>
              </Link>
            </Pressable>
          </>
        )}
        {isLoggedIn ? (
          <Pressable onPress={handleLogout}>
            <Text style={styles.text}>Log out</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.navigationItem}>
            <Link to="/signin">
              <Text style={styles.text}>Sign In</Text>
            </Link>
          </Pressable>
        )}
        {!isLoggedIn && (
          <Pressable style={styles.navigationItem}>
            <Link to="/register">
              <Text style={styles.text}>Sign Up</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

export default AppBar;
