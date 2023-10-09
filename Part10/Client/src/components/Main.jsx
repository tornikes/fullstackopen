import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

import theme from "../theme";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReviewForm";
import CreateUser from "./CreateUserForm";
import UsersReviews from "./UsersReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<CreateReview />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/reviews" element={<UsersReviews />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
}

export default Main;
