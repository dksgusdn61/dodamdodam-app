import React from "react";
import { Pressable, Text, StyleSheet, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import { usePressAnimation, useHaptic } from "@shared/hooks";
import type { HapticType } from "@shared/hooks";
import type { ColorTokens } from "@shared/tokens";

type ButtonSize = "large" | "mideum" | "small";
type FilledButtonRole = "primary" | "negative" | "assistive";
type ButtonDisplay = "inline" | "fill";

interface FilledButtonProps {
  role?: FilledButtonRole;
  size?: ButtonSize;
  display?: ButtonDisplay;
  disabled?: boolean;
  haptic?: HapticType | false;
  onPress?: () => void;
  buttonCustomStyle?: ViewStyle;
  children?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "large":
      return { paddingHorizontal: 28, minHeight: 48, borderRadius: shapes.medium, typoStyle: typo("Body1", "Medium") };
    case "mideum":
      return { paddingHorizontal: 20, minHeight: 40, borderRadius: shapes.small, typoStyle: typo("Body2", "Medium") };
    case "small":
      return { paddingHorizontal: 12, minHeight: 32, borderRadius: shapes.extraSmall, typoStyle: typo("Caption2", "Bold") };
  }
};

const getRoleStyles = (role: FilledButtonRole, colors: ColorTokens) => {
  switch (role) {
    case "primary":
      return { bg: colors.brand.primary, color: colors.static.white };
    case "negative":
      return { bg: colors.status.error, color: colors.static.white };
    case "assistive":
      return { bg: colors.fill.primary, color: colors.text.tertiary };
  }
};

export const FilledButton = ({
  role = "primary",
  size = "mideum",
  display = "inline",
  disabled = false,
  haptic = "light",
  onPress,
  buttonCustomStyle = {},
  children,
}: FilledButtonProps) => {
  const { colors } = useTheme();
  const { animatedStyle, brightnessOverlayStyle, handlePressIn, handlePressOut } =
    usePressAnimation({ disabled });
  const triggerHaptic = useHaptic(haptic || "light");
  const sizeStyle = getSizeStyles(size);
  const roleStyle = getRoleStyles(role, colors);

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : () => { if (haptic !== false) triggerHaptic(); onPress?.(); }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.container,
        {
          paddingHorizontal: sizeStyle.paddingHorizontal,
          minHeight: sizeStyle.minHeight,
          borderRadius: sizeStyle.borderRadius,
          backgroundColor: roleStyle.bg,
          opacity: disabled ? 0.5 : 1,
        },
        display === "fill" ? styles.fill : undefined,
        animatedStyle,
        buttonCustomStyle,
      ]}
    >
      <Animated.View
        style={[
          styles.brightnessOverlay,
          { borderRadius: sizeStyle.borderRadius },
          brightnessOverlayStyle,
        ]}
        pointerEvents="none"
      />
      <Text style={[sizeStyle.typoStyle, { color: roleStyle.color }]}>
        {children}
      </Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fill: {
    flex: 1,
    minWidth: 0,
  },
  brightnessOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
});

export type { FilledButtonProps, ButtonSize, FilledButtonRole, ButtonDisplay };
