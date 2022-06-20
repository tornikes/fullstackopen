import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
}

export default Main;
