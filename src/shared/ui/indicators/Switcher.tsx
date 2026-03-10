import React, { type ReactNode } from "react";
import Animated from "react-native-reanimated";
import { useSwitcher } from "./useSwitcher";

interface SwitcherProps {
  pages?: ReactNode[];
  current?: number;
  animated?: boolean;
}

export const Switcher = ({
  pages = [],
  current = 0,
  animated = false,
}: SwitcherProps) => {
  const { rendered, animatedStyle } = useSwitcher({ pages, current, animated });

  return <Animated.View style={animatedStyle}>{rendered}</Animated.View>;
};

export type { SwitcherProps };
