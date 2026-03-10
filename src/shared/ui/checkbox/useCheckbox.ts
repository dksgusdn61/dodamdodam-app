import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import type { ColorTokens } from "@shared/tokens";

type CheckboxType = "primary" | "error";
type CheckboxVariant = "outlined" | "filled";

interface UseCheckboxOptions {
  selected: boolean;
  variant: CheckboxVariant;
  type: CheckboxType;
  disabled: boolean;
  colors: ColorTokens;
}

export const getCheckmarkColor = ({
  variant,
  selected,
  disabled,
  type,
  colors,
}: UseCheckboxOptions): string => {
  if (variant === "filled") return colors.static.white;
  if (selected) {
    return type === "primary" ? colors.brand.primary : colors.status.error;
  }
  return disabled ? colors.border.disabled : colors.border.normal;
};

export const getCheckboxBackgroundColor = ({
  variant,
  selected,
  type,
  colors,
}: Omit<UseCheckboxOptions, "disabled">): string => {
  if (variant === "outlined") return "transparent";
  if (selected) {
    return type === "primary" ? colors.brand.primary : colors.status.error;
  }
  return "transparent";
};

export const useCheckbox = ({ selected, variant }: Pick<UseCheckboxOptions, "selected" | "variant">) => {
  const checkScale = useSharedValue(selected ? 1 : 0);
  const checkOpacity = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    if (variant === "filled") {
      checkScale.value = withSpring(selected ? 1 : 0.5, { duration: 150 });
      checkOpacity.value = withTiming(selected ? 1 : 0, { duration: 150 });
    }
  }, [selected, variant, checkScale, checkOpacity]);

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkOpacity.value,
  }));

  return { checkAnimatedStyle };
};
