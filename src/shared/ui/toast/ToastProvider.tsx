import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type ToastItemData, type ToastPosition, toastManager } from "./toastManager";
import { ToastItem } from "./ToastItem";
import { useToasts } from "./useToasts";

export const ToastProvider = ({ children }: { children?: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const { topToasts, bottomToasts } = useToasts();

  const renderToasts = (items: ToastItemData[], position: ToastPosition) => (
    <View
      style={[
        styles.container,
        position === "top"
          ? { top: insets.top + 8, flexDirection: "column" }
          : { bottom: insets.bottom + 8, flexDirection: "column-reverse" },
      ]}
      pointerEvents="box-none"
    >
      {items.map((item) => (
        <ToastItem
          key={item.id}
          item={item}
          onRemove={() => toastManager.hide(item.id)}
        />
      ))}
    </View>
  );

  return (
    <>
      {children}
      {renderToasts(topToasts, "top")}
      {renderToasts(bottomToasts, "bottom")}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 8,
    zIndex: 9999,
  },
});
