import React, { useEffect, useRef } from "react";
import { CommonActions, NavigationContainer, type NavigationContainerRef } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@shared/theme";
import { ToastProvider, OverlayProvider } from "@shared/ui";
import { setSessionExpiredHandler } from "@entities/api/common";
import { RootStackNavigator } from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    setSessionExpiredHandler(() => {
      navigationRef.current?.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }),
      );
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <OverlayProvider>
              <BottomSheetModalProvider>
                <ToastProvider>
                  <NavigationContainer ref={navigationRef}>
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
