import React, { useCallback, isValidElement, cloneElement } from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { shapes } from "@shared/tokens";
import { usePressAnimation, useHaptic } from "@shared/hooks";
import type { HapticType } from "@shared/hooks";

interface IconButtonProps {
  icon: React.ReactNode;
  size?: number;
  iconSize?: number;
  haptic?: HapticType | false;
  onPress?: () => void;
  disabled?: boolean;
  customStyle?: ViewStyle;
}

export const IconButton = ({
  icon,
  size = 40,
  iconSize,
  haptic = "light",
  onPress,
  disabled = false,
  customStyle = {},
}: IconButtonProps) => {
  const { colors } = useTheme();
  const { animatedStyle, handlePressIn: pressIn, handlePressOut: pressOut } = usePressAnimation({ disabled });
  const triggerHaptic = useHaptic(haptic || "light");
  const computedIconSize = iconSize ?? Math.floor(size * 0.5);
  const bgProgress = useSharedValue(0);

  const bgAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      bgProgress.value,
      [0, 1],
      ["transparent", colors.fill.secondary]
    ),
  }));

  const handlePressIn = useCallback(() => {
    if (!disabled) {
      bgProgress.value = withTiming(1, { duration: 100, easing: Easing.linear });
    }
    pressIn();
  }, [disabled, bgProgress, pressIn]);

  const handlePressOut = useCallback(() => {
    bgProgress.value = withTiming(0, { duration: 100, easing: Easing.linear });
    pressOut();
  }, [bgProgress, pressOut]);

  const renderIcon = () => {
    if (isValidElement<{ size?: number }>(icon)) {
      return cloneElement(icon, { size: computedIconSize });
    }
    return icon;
  };

  return (
    <Pressable
      onPress={disabled ? undefined : () => { if (haptic !== false) triggerHaptic(); onPress?.(); }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityLabel="icon button"
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: shapes.small,
            opacity: disabled ? 0.5 : 1,
          },
          bgAnimatedStyle,
          animatedStyle,
          customStyle,
        ]}
      >
        {renderIcon()}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export type { IconButtonProps };
