import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@shared/theme";
import { ToastProvider, OverlayProvider } from "@shared/ui";
import { RootStackNavigator } from "./navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <OverlayProvider>
            <ToastProvider>
              <NavigationContainer>
                <RootStackNavigator />
              </NavigationContainer>
            </ToastProvider>
          </OverlayProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
