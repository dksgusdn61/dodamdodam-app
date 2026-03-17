import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@shared/theme";
import { ToastProvider, OverlayProvider } from "@shared/ui";
import { RootStackNavigator } from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <OverlayProvider>
              <BottomSheetModalProvider>
                <ToastProvider>
                  <NavigationContainer>
                    <RootStackNavigator />
                  </NavigationContainer>
                </ToastProvider>
              </BottomSheetModalProvider>
            </OverlayProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
