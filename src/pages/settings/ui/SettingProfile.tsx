import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { usePressAnimation } from "@shared/hooks";
import { typo } from "@shared/tokens";
import { Avatar } from "@shared/ui";

interface SettingProfileProps {
  name: string;
  onEditPress?: () => void;
}

export const SettingProfile = React.memo(
  ({ name, onEditPress }: SettingProfileProps) => {
    const { colors } = useTheme();
    const { animatedStyle, handlePressIn, handlePressOut } =
      usePressAnimation({ scale: 0.97 });

    return (
      <Pressable
        onPress={onEditPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <Avatar size={80} />
          <View style={styles.textContainer}>
            <Text style={[styles.name, { color: colors.text.primary }]}>
              {name}
            </Text>
            <Text
              style={[styles.editLabel, { color: colors.text.tertiary }]}
            >
              정보 수정
            </Text>
          </View>
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
    paddingVertical: 20,
    gap: 16,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    ...typo("Heading2", "Bold"),
  },
  editLabel: {
    ...typo("Label", "Medium"),
    textDecorationLine: "underline",
  },
});
