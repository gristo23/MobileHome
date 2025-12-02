import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function AddVanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lisa uus matkaauto</Text>
      <TextInput placeholder="Pealkiri" style={styles.input} />
      <TextInput placeholder="Asukoht" style={styles.input} />
      <TextInput placeholder="Kirjeldus" style={styles.input} multiline />
      <Button title="Salvesta (mock)" onPress={() => alert("Salvestatud!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12, borderRadius: 4 },
});
