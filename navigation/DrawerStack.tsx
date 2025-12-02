// navigation/DrawerStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AdsListScreen from "../screens/AdsListScreen"; 
import VanDetailScreen from "../screens/VanDetailScreen"; 
import AuthScreen from "../screens/AuthScreen";
import Header from "../components/Header";

export type DrawerParamList = {
  Avaleht: undefined;
  Otsing: undefined;
  Kuulutused: {
    vehicleType?: "Matkaauto" | "Haagissuvila";
    gearbox?: "Automaat" | "Manuaal";
    petsAllowed?: boolean;
    location?: string;
    seats?: number;
    startDate?: string;
    endDate?: string;
  };
  "Auto detailid": { van: any };
  Sisselogimine: undefined;
};

const Stack = createNativeStackNavigator();

export default function DrawerStack() {
  // Temporarily use Stack Navigator for all platforms until worklets version is fixed
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen name="Avaleht" component={HomeScreen} />
      <Stack.Screen name="Otsing" component={SearchScreen} />
      <Stack.Screen name="Kuulutused" component={AdsListScreen} />
      <Stack.Screen name="Auto detailid" component={VanDetailScreen} />
      <Stack.Screen name="Sisselogimine" component={AuthScreen} />
    </Stack.Navigator>
  );
}
