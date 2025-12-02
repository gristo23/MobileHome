import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Main Page
      </Text>
      <Text>
        Welcome to the main screen with themed components!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
});