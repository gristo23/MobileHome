// screens/VanDetailScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import type { DrawerParamList } from "../navigation/DrawerStack";
import type { van } from "../types/van";
import { Calendar } from "react-native-calendars";

type DetailRoute = RouteProp<DrawerParamList, "Auto detailid">;

export default function VanDetailScreen() {
  const route = useRoute<DetailRoute>();
  const { van } = route.params;

  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string>(van.image);

  const handleDayPress = (day: { dateString: string }) => {
    if (!startDate) {
      setStartDate(day.dateString);
      setEndDate(undefined);
    } else if (!endDate) {
      if (day.dateString < startDate) {
        setStartDate(day.dateString);
        setEndDate(undefined);
      } else {
        setEndDate(day.dateString);
      }
    } else {
      setStartDate(day.dateString);
      setEndDate(undefined);
    }
  };

  const marked: Record<string, any> = {};
  if (startDate) marked[startDate] = { selected: true, startingDay: true, color: "#007AFF", textColor: "#fff" };
  if (endDate) marked[endDate] = { selected: true, endingDay: true, color: "#007AFF", textColor: "#fff" };

  const handleBooking = () => {
    if (!startDate || !endDate) {
      Alert.alert("Vali kuupäevad", "Palun vali algus- ja lõppkuupäev enne broneerimist.");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const total = days * van.price;

    Alert.alert(
      "Broneering kinnitatud",
      `${van.title} (${van.location})\n${startDate} → ${endDate}\n${days} päeva × €${van.price} = €${total}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: imageSrc }}
        style={styles.image}
        resizeMode="cover"
        onError={() => setImageSrc(`https://picsum.photos/600/400?random=${van.id}`)}
      />
      <View style={styles.header}>
        <Text style={styles.title}>{van.title}</Text>
        <Text style={styles.price}>€{van.price}/päev</Text>
      </View>
      <Text style={styles.location}>{van.location}</Text>
      <Text style={styles.description}>{van.description}</Text>

      <Text style={styles.subheading}>Funktsioonid</Text>
      <View style={styles.features}>
        {van.features.map((f, idx) => (
          <View key={idx} style={styles.featureItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subheading}>Vali kuupäevad</Text>
      <Calendar
        onDayPress={handleDayPress}
        markingType="period"
        markedDates={marked}
      />

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Broneeri</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: "100%", height: 240, borderRadius: 12, backgroundColor: "#eee" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold" },
  price: { fontSize: 18, fontWeight: "600", color: "#007AFF" },
  location: { marginTop: 4, fontSize: 16, color: "#555" },
  description: { marginTop: 12, fontSize: 15, color: "#333" },
  subheading: { marginTop: 16, fontSize: 16, fontWeight: "600" },
  features: { marginTop: 8 },
  featureItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  bullet: { fontSize: 16, marginRight: 6, color: "#007AFF" },
  featureText: { fontSize: 14, color: "#007AFF" },
  button: {
    marginTop: 24,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
