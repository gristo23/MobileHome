// screens/AdsListScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchVans } from "../utils/api";
import type { van } from "../types/van";
import { useRoute, useNavigation, RouteProp, NavigationProp } from "@react-navigation/native";
import type { DrawerParamList } from "../navigation/DrawerStack";

type AdsRoute = RouteProp<DrawerParamList, "Kuulutused">;

export default function AdsListScreen() {
  const [ads, setAds] = useState<van[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute<AdsRoute>();
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const filters = route.params || {};

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await fetchVans();
        let filtered = data;

        // Asukoht
        if (filters.location) {
          filtered = filtered.filter((v) => v.location === filters.location);
        }

        // Sõiduki tüüp
        if (filters.vehicleType) {
          const vehicleType = filters.vehicleType;
          filtered = filtered.filter((v) => {
            if ((v as any).vehicleType) {
              return (v as any).vehicleType === vehicleType;
            }
            // fallback: kontrollime pealkirja
            return v.title.toLowerCase().includes(vehicleType.toLowerCase());
          });
        }

        // Istekohtade arv
        if (filters.seats) {
          filtered = filtered.filter((v) => (v as any).seats === filters.seats);
        }

        // Käigukast
        if (filters.gearbox) {
          filtered = filtered.filter((v) => (v as any).gearbox === filters.gearbox);
        }

        // Lemmikloomad
        if (filters.petsAllowed) {
          filtered = filtered.filter((v) => (v as any).petsAllowed);
        }

        setAds(filtered);
      } catch (err) {
        console.error("Vans fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, [filters]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (ads.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Ühtegi kuulutust ei leitud.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Aktiivsete filtrite kuvamine */}
      <View style={styles.filtersBar}>
        <Text style={styles.filtersText}>
          {filters.vehicleType ? `${filters.vehicleType} • ` : ""}
          {filters.gearbox ? `${filters.gearbox} • ` : ""}
          {filters.seats ? `${filters.seats} istekohta • ` : ""}
          {filters.location ? `${filters.location}` : ""}
        </Text>
      </View>

      <FlatList
        data={ads}
        keyExtractor={(item, index) => item.id + "-" + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Auto detailid", { van: item })}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.price}>{item.price} € / päev</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.meta}>
                  {(item as any).seats} istekohta • {(item as any).gearbox} •{" "}
                  {(item as any).vehicleType} •{" "}
                  {(item as any).petsAllowed ? "Lemmikloomad lubatud" : "Lemmikloomad keelatud"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  filtersBar: {
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
  },
  filtersText: { fontSize: 14, color: "#333" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    padding: 12,
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  location: { fontSize: 14, color: "#555" },
  price: { fontSize: 14, color: "#007AFF", fontWeight: "600", marginTop: 4 },
  description: { fontSize: 12, color: "#666", marginTop: 4 },
  meta: { fontSize: 12, color: "#333", marginTop: 4 },
});
