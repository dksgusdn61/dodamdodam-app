import React from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { useHaptic } from "@shared/hooks";
import type { HapticType } from "@shared/hooks";
import { useSwitch } from "./useSwitch";

type SwitchSize = "medium" | "small";

const SIZES: Record<
  SwitchSize,
  { width: number; height: number; thumb: number; translate: number }
> = {
  medium: { width: 52, height: 30, thumb: 22, translate: 22 },
  small: { width: 44, height: 26, thumb: 18, translate: 18 },
};

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  haptic?: HapticType | false;
  size?: SwitchSize;
  customStyle?: ViewStyle;
}

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  haptic = "selection",
  size = "medium",
  customStyle = {},
}: SwitchProps) => {
  const { colors } = useTheme();
  const triggerHaptic = useHaptic(haptic || "selection");
  const dims = SIZES[size];
  const { thumbAnimatedStyle } = useSwitch({ checked, translate: dims.translate });

  return (
    <Pressable
      onPress={disabled ? undefined : () => { if (haptic !== false) triggerHaptic(); onChange(); }}
      style={[
        styles.track,
        {
          width: dims.width,
          height: dims.height,
          backgroundColor: checked
            ? colors.brand.primary
            : colors.fill.secondary,
          opacity: disabled ? 0.4 : 1,
        },
        customStyle,
      ]}
      accessibilityRole="switch"
      accessibilityState={{ checked }}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            width: dims.thumb,
            height: dims.thumb,
            backgroundColor: colors.static.white,
          },
          thumbAnimatedStyle,
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 9999,
  },
  thumb: {
    borderRadius: 9999,
  },
});

export type { SwitchProps, SwitchSize };
