import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Switch,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { theme, toggleTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      source={{
        uri:
          width < 768
            ? "https://i.postimg.cc/7ZpF03ML/camping-5099382-720.jpg" // väiksem mobiili pilt
            : "https://i.postimg.cc/7ZpF03ML/camping-5099382-1920.jpg", // suurem desktop/web pilt
      }}
      style={styles.background}
      resizeMode="cover" // ✅ propina, mitte style sees
    >
      {/* 1. ÜLEMINE SISU KONTEINER */}
      <View style={styles.topSection}>
        <View style={styles.contentWrapper}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate("Otsing")}
          >
            <Text style={styles.searchPlaceholder}>Kuulutuste otsing? 🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. ALUMINE NAVIGEERIMISE SEKTSIOON */}
      <ImageBackground
        source={{
          uri: "https://i.postimg.cc/t4LKW3tP/Screenshot-2025-10-25-124328.png",
        }}
        style={styles.mapSection}
        resizeMode="cover" // ✅ propina
      >
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Avaleht")}>
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.navIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Settings popup */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Seaded</Text>
            <View style={styles.row}>
              <Text>Dark Mode</Text>
              <Switch value={theme === "dark"} onValueChange={toggleTheme} />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Sulge</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#000000ff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "60%",
    maxWidth: 360,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: "#000000ff",
  },
  mapSection: {
    height: 100,
    justifyContent: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingVertical: 12,
  },
  navIcon: {
    fontSize: 24,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
  },
});
