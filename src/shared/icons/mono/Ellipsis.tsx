import React from "react";
import Svg, { Circle } from "react-native-svg";
import type { IconWithColorProps } from "../types";

export const Ellipsis = ({ size = 24, color = "#0F0F10" }: IconWithColorProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="5" cy="12" r="2" fill={color} />
    <Circle cx="12" cy="12" r="2" fill={color} />
    <Circle cx="19" cy="12" r="2" fill={color} />
  </Svg>
);
