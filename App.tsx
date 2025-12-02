// App.tsx (Täiendatud)
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerStack from "./navigation/DrawerStack";
import { ThemeProvider } from "./context/ThemeContext";
// 💡 LISA Autentimise kontekst
import { AuthProvider } from "./context/AuthContext"; 



export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Autentimise pakkuja peaks olema väljaspool, et ligi pääseda kogu rakenduses */}
        <AuthProvider> 
          <ThemeProvider>
            <NavigationContainer>
              {/* DrawerStack on siin, aga see peab ise otsustama, kas näidata AuthScreeni või põhiekraane */}
              <DrawerStack />
            </NavigationContainer>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}