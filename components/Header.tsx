// components/Header.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

  return (
    <View style={styles.wrapper}>
      {/* Ülemine sinine riba */}
      <View style={styles.blueBar}>
        <Text style={styles.blueText}>Vabadus puhata omas rütmis!</Text>
      </View>

      {/* Alumine valge riba */}
      <View style={styles.whiteBar}>
        {/* Logo vasakul */}
        <TouchableOpacity
          style={styles.logoTouch}
          onPress={() => navigation.navigate("Avaleht")}
          accessibilityLabel="Tagasi avalehele"
        >
          <Image
            source={{ uri: "https://i.postimg.cc/vBz8PtwL/1st-logo.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Brändinimi keskel */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Rolling Home Rent</Text>
        </View>

        {/* User ikoon paremal */}
        <TouchableOpacity
          style={styles.userTouch}
          onPress={() => navigation.navigate("Sisselogimine")}
          accessibilityLabel="Ava sisselogimise ja registreerimise aken"
        >
          <Text style={styles.userIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const HEADER_HEIGHT = 104;
const BLUE_BAR_HEIGHT = 106;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
  },
  blueBar: {
    height: BLUE_BAR_HEIGHT,
    backgroundColor: "#5c9fe6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  blueText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  whiteBar: {
    height: HEADER_HEIGHT,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  logoTouch: {
    marginRight: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  userTouch: {
    marginLeft: 12,
    padding: 6,
  },
  userIcon: {
    fontSize: 30,
    color: "#333",
  },
});
