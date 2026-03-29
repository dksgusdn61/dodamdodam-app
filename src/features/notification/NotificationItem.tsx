import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { SquircleView } from "react-native-figma-squircle";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { Bell } from "@shared/icons/mono";
import { usePressAnimation } from "@shared/hooks";
import { formatRelativeTime } from "@shared/utils";
import type { Notification } from "@entities/notification/types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface NotificationItemProps {
  item: Notification;
  onPress?: (id: string) => void;
}

export const NotificationItem = ({ item, onPress }: NotificationItemProps) => {
  const { colors } = useTheme();
  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation({ scale: 0.98 });

  return (
    <AnimatedPressable
      style={[styles.item, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress?.(item.id)}
    >
      <SquircleView
        style={styles.iconBox}
        squircleParams={{
          cornerRadius: 10,
          cornerSmoothing: 0.8,
          fillColor: colors.fill.secondary,
        }}
      >
        <Bell size={20} color={colors.text.tertiary} />
      </SquircleView>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleLeft}>
            <Text style={[typo("Body1", "SemiBold"), { color: colors.text.primary }]}>
              {item.title}
            </Text>
            {!item.isRead && <View style={[styles.dot, { backgroundColor: colors.brand.primary }]} />}
          </View>
          <Text style={[typo("Caption1", "Regular"), { color: colors.text.tertiary }]}>
            {formatRelativeTime(item.createdAt)}
          </Text>
        </View>
        <Text
          style={[typo("Body2", "Regular"), { color: colors.text.secondary }]}
          numberOfLines={2}
        >
          {item.body}
        </Text>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
