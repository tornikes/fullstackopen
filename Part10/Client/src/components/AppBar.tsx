import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#24292ebc',
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  text: {
    color: '#fff',
  },
});

function AppBar() {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
}

export default AppBar;
