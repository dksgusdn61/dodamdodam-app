import React from "react";
import { View, type ViewStyle } from "react-native";
import Svg, { Circle as SvgCircle } from "react-native-svg";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import {
  useCircularProgress,
  SIZE,
  STROKE_WIDTH,
  CENTER,
  RADIUS,
  CIRCUMFERENCE,
} from "./useCircularProgress";

const AnimatedCircle = Animated.createAnimatedComponent(SvgCircle);

interface CircularProgressProps {
  progress: number;
  disabled?: boolean;
  customStyle?: ViewStyle;
}

export const CircularProgress = ({
  progress,
  disabled = false,
  customStyle = {},
}: CircularProgressProps) => {
  const { colors } = useTheme();
  const { value, animatedProps } = useCircularProgress(progress);

  const trackColor = colors.border.subtle;
  const activeColor = disabled ? colors.border.strong : colors.brand.primary;

  return (
    <View
      style={customStyle}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      <Svg width={SIZE} height={SIZE}>
        <SvgCircle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={trackColor}
          strokeWidth={STROKE_WIDTH}
        />
        <AnimatedCircle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={activeColor}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </Svg>
    </View>
  );
};

export type { CircularProgressProps };
