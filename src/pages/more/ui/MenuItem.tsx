import React from "react";
import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";
import Animated from "react-native-reanimated";
import { SquircleView } from "react-native-figma-squircle";
import { useTheme } from "@shared/theme";
import { usePressAnimation } from "@shared/hooks";
import { typo } from "@shared/tokens";
import { ChevronRight } from "@shared/icons/mono";

interface MenuItemProps {
  icon?: React.ReactNode;
  iconImage?: ImageSourcePropType;
  iconColor?: string;
  title: string;
  appName?: string;
  onPress?: () => void;
}

const ICON_CONTAINER_SIZE = 40;
const ICON_RADIUS = 12;
const ICON_SIZE = 22;

export const MenuItem = React.memo(
  ({ icon, iconImage, iconColor, title, appName, onPress }: MenuItemProps) => {
    const { colors } = useTheme();
    const { animatedStyle, handlePressIn, handlePressOut } =
      usePressAnimation({ scale: 0.98 });

    const color = iconColor ?? colors.text.secondary;

    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <SquircleView
            style={styles.iconContainer}
            squircleParams={{
              cornerRadius: ICON_RADIUS,
              cornerSmoothing: 0.8,
              fillColor: colors.fill.secondary,
            }}
          >
            {iconImage ? (
              <Image source={iconImage} style={styles.iconImage} />
            ) : React.isValidElement<{ size?: number; color?: string }>(icon) ? (
              React.cloneElement(icon, { size: ICON_SIZE, color })
            ) : icon}
          </SquircleView>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              {title}
            </Text>
            {appName && (
              <Text style={[styles.appName, { color: colors.text.tertiary }]}>
                - {appName}
              </Text>
            )}
          </View>
          <ChevronRight size={16} color={colors.text.tertiary} />
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: 4,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    ...typo("Body1", "Medium"),
  },
  appName: {
    ...typo("Caption1", "Medium"),
  },
});
