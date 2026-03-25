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

const ICON_BOX = 40;
const ICON_RADIUS = 12;
const ICON_SIZE = 22;

const IconBox = ({ icon, iconImage, iconColor, fillColor }: {
  icon?: React.ReactNode;
  iconImage?: ImageSourcePropType;
  iconColor: string;
  fillColor: string;
}) => {
  if (iconImage) {
    return <Image source={iconImage} style={styles.iconImage} />;
  }

  return (
    <SquircleView
      style={styles.iconBox}
      squircleParams={{ cornerRadius: ICON_RADIUS, cornerSmoothing: 0.8, fillColor }}
    >
      {React.isValidElement<{ size?: number; color?: string }>(icon)
        ? React.cloneElement(icon, { size: ICON_SIZE, color: iconColor })
        : icon}
    </SquircleView>
  );
};

export const MenuItem = React.memo(
  ({ icon, iconImage, iconColor, title, appName, onPress }: MenuItemProps) => {
    const { colors } = useTheme();
    const { animatedStyle, handlePressIn, handlePressOut } =
      usePressAnimation({ scale: 0.98 });

    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <IconBox
            icon={icon}
            iconImage={iconImage}
            iconColor={iconColor ?? colors.text.secondary}
            fillColor={colors.fill.secondary}
          />
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
            {appName && (
              <Text style={[styles.appName, { color: colors.text.tertiary }]}>- {appName}</Text>
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
    paddingVertical: 6,
    gap: 12,
  },
  iconBox: {
    width: ICON_BOX,
    height: ICON_BOX,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: ICON_BOX,
    height: ICON_BOX,
    borderRadius: ICON_RADIUS,
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
