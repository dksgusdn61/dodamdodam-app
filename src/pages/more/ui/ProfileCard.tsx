import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { usePressAnimation } from "@shared/hooks";
import { typo } from "@shared/tokens";
import { Avatar } from "@shared/ui";

interface ProfileCardProps {
  name: string;
  roleLabel: string;
  onPress?: () => void;
}

export const ProfileCard = React.memo(({ name, roleLabel, onPress }: ProfileCardProps) => {
  const { colors } = useTheme();
  const { animatedStyle, handlePressIn, handlePressOut } =
    usePressAnimation({ scale: 0.97 });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <Avatar size={64} />
        <View style={styles.textContainer}>
          <Text style={[styles.greeting, { color: colors.text.primary }]}>
            환영합니다, {name}님
          </Text>
          <Text style={[styles.roleLabel, { color: colors.text.tertiary }]}>
            {roleLabel}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
    borderRadius: 16,
    borderCurve: "continuous" as const,
    overflow: "hidden" as const,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  greeting: {
    ...typo("Headline", "Bold"),
  },
  roleLabel: {
    ...typo("Label", "Medium"),
  },
});
