import React from "react";
import { Keyboard, Pressable, StyleSheet, type ViewStyle } from "react-native";

interface TextAreaProviderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const TextAreaProvider = ({ children, style }: TextAreaProviderProps) => (
  <Pressable style={[styles.container, style]} onPress={() => Keyboard.dismiss()}>
    {children}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
