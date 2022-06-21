import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

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
  navItem: {
    marginRight: 10,
  },
  horizontal: {
    justifyContent: 'flex-end',
  },
});

function AppBar() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.horizontal}>
        <Pressable style={styles.navItem}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Link to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default AppBar;
