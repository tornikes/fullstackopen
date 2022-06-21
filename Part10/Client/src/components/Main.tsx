import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
}

export default Main;
