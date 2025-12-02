// screens/SearchScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import type { DrawerParamList } from "../navigation/DrawerStack";
import { Calendar } from "react-native-calendars";

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  const [location, setLocation] = useState<string>("");
  const [gearbox, setGearbox] = useState<"Automaat" | "Manuaal" | "">("");
  const [seats, setSeats] = useState<string>("");
  const [petsAllowed, setPetsAllowed] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

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

  const handleSearch = () => {
    navigation.navigate("Kuulutused", {
      location: location || undefined,
      gearbox: gearbox === "" ? undefined : gearbox,
      seats: seats ? Number(seats) : undefined,
      petsAllowed,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Otsi kuulutusi</Text>

      <Text style={styles.sectionTitle}>Vali kuupäevad</Text>
      <Calendar
        onDayPress={handleDayPress}
        markingType="period"
        markedDates={marked}
      />
      {startDate && endDate && (
        <Text style={styles.dateRange}>
          Valitud: {startDate} → {endDate}
        </Text>
      )}

      <Text style={styles.sectionTitle}>Muud filtrid</Text>

      <TextInput
        style={styles.input}
        placeholder="Asukoht (nt Tallinn)"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Istekohtade arv"
        keyboardType="numeric"
        value={seats}
        onChangeText={setSeats}
      />

      <TextInput
        style={styles.input}
        placeholder="Käigukast (Automaat/Manuaal)"
        value={gearbox}
        onChangeText={(val) =>
          val === "Automaat" || val === "Manuaal"
            ? setGearbox(val)
            : setGearbox("")
        }
      />

      <View style={styles.switchRow}>
        <Text>Lemmikloomad lubatud</Text>
        <Switch value={petsAllowed} onValueChange={setPetsAllowed} />
      </View>

      <Button title="Otsi" onPress={handleSearch} />

      <View style={{ marginTop: 16 }}>
        <Button
          title="Kõik kuulutused"
          onPress={() => navigation.navigate("Kuulutused", {})}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  dateRange: {
    fontSize: 14,
    color: "#007AFF",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 12,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
