import { useState } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import React from "react";
import type { ColorTokens } from "@shared/tokens";

interface UseTextFieldOptions {
  value: string;
  isError: boolean;
  disabled: boolean;
  colors: ColorTokens;
}

export const useTextField = ({ value, isError, disabled, colors }: UseTextFieldOptions) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowValue, setIsShowValue] = useState(false);

  const hasValue = value.length > 0;

  const labelTranslateY = useSharedValue(hasValue ? -20 : 0);
  const labelFontSize = useSharedValue(hasValue ? 14 : 18);

  React.useEffect(() => {
    const shouldFloat = isFocused || hasValue;
    labelTranslateY.value = withTiming(shouldFloat ? -20 : 0, { duration: 200 });
    labelFontSize.value = withTiming(shouldFloat ? 14 : 18, { duration: 200 });
  }, [isFocused, hasValue, labelTranslateY, labelFontSize]);

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: labelTranslateY.value }],
    fontSize: labelFontSize.value,
  }));

  const getBorderColor = () => {
    if (isError) return colors.status.error;
    if (isFocused) return colors.brand.primary;
    return colors.border.normal;
  };

  const getLabelColor = () => {
    if (disabled) return colors.text.disabled;
    if (isError) return colors.status.error;
    if (isFocused) return colors.brand.primary;
    return colors.text.tertiary;
  };

  return {
    isFocused,
    setIsFocused,
    isShowValue,
    setIsShowValue,
    hasValue,
    labelAnimatedStyle,
    getBorderColor,
    getLabelColor,
  };
};
