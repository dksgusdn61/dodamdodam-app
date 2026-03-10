import React from "react";
import { View, type ViewStyle } from "react-native";
import type { IconProps } from "../types";

export const Schedule = ({ size = 24 }: IconProps) => {
  const style: ViewStyle = {
    width: size,
    height: size,
    borderRadius: 4,
    backgroundColor: "#F0E6D3",
  };

  return <View style={style} />;
};
