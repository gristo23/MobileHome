// components/LocationSelect.tsx
import React, { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

type Props = {
  value: string;
  onChange: (next: string) => void;
  options?: string[];
  label?: string;
};

const DEFAULT_OPTIONS = ["Tallinn", "Tartu", "Pärnu"];

export default function LocationSelect({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  label = "Vali sihtkoht",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.selector} onPress={() => setOpen(true)}>
        <Text style={styles.selectorText}>{value}</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            {options.map((opt) => (
              <Pressable
                key={opt}
                style={[
                  styles.option,
                  opt === value && styles.optionActive,
                ]}
                onPress={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  selector: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  selectorText: { fontSize: 16 },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    padding: 24,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  optionActive: {
    backgroundColor: "#f0f8ff",
  },
  optionText: { fontSize: 16 },
});
