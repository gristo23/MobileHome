// components/HeaderLogo.tsx
import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLogo() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => (navigation as any).navigate("Avaleht")}>
      <Image
        source={{ uri: "https://i.postimg.cc/vBz8PtwL/1st-logo.png" }}
        style={styles.logo}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    borderRadius: 24, // ~20% ümardus (120px * 0.2 = 24px)
    resizeMode: "contain",
  },
});
