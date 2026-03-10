import React from "react";
import { View, type ViewStyle } from "react-native";
import type { IconProps } from "../types";

export const Globe = ({ size = 24 }: IconProps) => {
  const style: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#4DA6FF",
  };

  return <View style={style} />;
};
