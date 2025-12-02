import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Praegune teema: {theme}</Text>
      <Button title="Vaheta teemat" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  text: { fontSize: 16, marginBottom: 12 },
});
