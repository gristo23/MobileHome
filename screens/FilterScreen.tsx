// screens/FilterScreen.tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function FilterScreen() {
  const navigation = useNavigation<any>();
  const [vehicleType, setVehicleType] = useState<"Karavan" | "Matkaauto" | undefined>();
  const [gearbox, setGearbox] = useState<"Automaat" | "Manuaal" | undefined>();
  const [seats, setSeats] = useState<number | undefined>();
  const [location, setLocation] = useState<string | undefined>();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sõiduki tüüp</Text>
      <Picker selectedValue={vehicleType} onValueChange={(val: "Karavan" | "Matkaauto" | undefined) => setVehicleType(val)}>
        <Picker.Item label="Vali tüüp" value={undefined} />
        <Picker.Item label="Karavan" value="Karavan" />
        <Picker.Item label="Matkaauto" value="Matkaauto" />
      </Picker>

      <Text style={styles.label}>Käigukast</Text>
      <Picker selectedValue={gearbox} onValueChange={(val: "Automaat" | "Manuaal" | undefined) => setGearbox(val)}>
        <Picker.Item label="Vali käigukast" value={undefined} />
        <Picker.Item label="Automaat" value="Automaat" />
        <Picker.Item label="Manuaal" value="Manuaal" />
      </Picker>

      <Text style={styles.label}>Istekohtade arv</Text>
      <Picker selectedValue={seats} onValueChange={(val: number | undefined) => setSeats(val)}>
        <Picker.Item label="Vali istekohtade arv" value={undefined} />
        {[...Array(9)].map((_, i) => (
          <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
        ))}
      </Picker>

      <Text style={styles.label}>Asukoht</Text>
      <Picker selectedValue={location} onValueChange={(val: string | undefined) => setLocation(val)}>
        <Picker.Item label="Vali asukoht" value={undefined} />
        <Picker.Item label="Tallinn" value="Tallinn" />
        <Picker.Item label="Tartu" value="Tartu" />
        <Picker.Item label="Pärnu" value="Pärnu" />
        <Picker.Item label="Muu Eesti" value="Muu Eesti" />
      </Picker>

      <Button
        title="Rakenda filtrid"
        onPress={() =>
          navigation.navigate("Kuulutused", {
            vehicleType,
            gearbox,
            seats,
            location,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 12 },
});
