import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
});

function Main() {
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  );
}

export default Main;
