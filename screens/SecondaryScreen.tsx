import { StyleSheet, View, Text } from 'react-native';

export default function SecondaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Secondary Page
      </Text>
      <Text>
        This is the secondary screen with themed styling.
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