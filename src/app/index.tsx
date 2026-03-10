import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@shared/theme";
import { ToastProvider, OverlayProvider } from "@shared/ui";
import { ComponentShowcase } from "@pages/component-showcase";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <OverlayProvider>
            <ToastProvider>
              <ComponentShowcase />
            </ToastProvider>
          </OverlayProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
