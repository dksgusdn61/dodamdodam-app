import React from "react";
import { Pressable, View, StyleSheet, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { shapes } from "@shared/tokens";
import { Checkmark } from "@shared/icons/mono";
import { usePressAnimation } from "@shared/hooks";
import { useCheckbox, getCheckmarkColor, getCheckboxBackgroundColor } from "./useCheckbox";

type CheckboxType = "primary" | "error";
type CheckboxVariant = "outlined" | "filled";

interface CheckboxProps {
  size?: "medium" | "small";
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  type?: CheckboxType;
  variant?: CheckboxVariant;
  checkboxCustomStyle?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Checkbox = ({
  size = "medium",
  selected,
  onPress,
  disabled = false,
  type = "primary",
  variant = "filled",
  checkboxCustomStyle = {},
}: CheckboxProps) => {
  const { colors } = useTheme();
  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation({
    scale: 0.9,
    disabled,
  });
  const { checkAnimatedStyle } = useCheckbox({ selected, variant });

  const iconSize = size === "medium" ? 20 : 14;
  const containerSize = size === "medium" ? 32 : 28;
  const checkmarkColor = getCheckmarkColor({ variant, selected, disabled, type, colors });
  const backgroundColor = getCheckboxBackgroundColor({ variant, selected, type, colors });
  const showBorder = variant !== "outlined" && !selected;

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: containerSize,
          minWidth: containerSize,
          aspectRatio: 1,
          borderRadius: shapes.extraSmall,
          backgroundColor,
          opacity: disabled ? 0.4 : 1,
          borderWidth: showBorder ? 2 : 0,
          borderColor: showBorder ? colors.border.normal : "transparent",
        },
        animatedStyle,
        checkboxCustomStyle,
      ]}
    >
      {variant === "outlined" ? (
        <View style={styles.iconWrapper}>
          <Checkmark size={iconSize} color={checkmarkColor} />
        </View>
      ) : (
        <Animated.View style={[styles.iconWrapper, checkAnimatedStyle]}>
          <Checkmark size={iconSize} color={checkmarkColor} />
        </Animated.View>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export type { CheckboxProps, CheckboxType, CheckboxVariant };
