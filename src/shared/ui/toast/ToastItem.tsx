import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useTheme } from "@shared/theme";
import { useToastAnimation } from "@shared/hooks";
import { typo } from "@shared/tokens";
import {
  CheckmarkCircleFill,
  XmarkCircle,
  ExclamationmarkCircle,
} from "@shared/icons/mono";
import type { ToastItemData, ToastType } from "./toastManager";

const ICON_SIZE = 20;

interface ToastItemProps {
  item: ToastItemData;
  onRemove: () => void;
}

export const ToastItem = ({ item, onRemove }: ToastItemProps) => {
  const { colors } = useTheme();
  const { panGesture, animatedStyle } = useToastAnimation({
    position: item.position,
    duration: item.duration,
    onRemove,
  });

  const TYPE_ICONS: Record<ToastType, ReactNode> = {
    default: null,
    success: <CheckmarkCircleFill size={ICON_SIZE} color={colors.status.success} />,
    error: <XmarkCircle size={ICON_SIZE} color={colors.status.error} />,
    warning: <ExclamationmarkCircle size={ICON_SIZE} color={colors.status.warning} />,
  };

  const icon = item.icon ?? TYPE_ICONS[item.type];

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.item,
          {
            backgroundColor: colors.fill.primary,
          },
          animatedStyle,
        ]}
      >
        {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
        <Text style={[styles.message, { color: colors.text.primary }]}>
          {item.message}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  message: {
    ...typo("Body2", "Medium"),
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
