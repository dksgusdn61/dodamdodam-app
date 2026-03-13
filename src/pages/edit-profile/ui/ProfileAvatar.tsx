import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "@shared/theme";
import { Avatar } from "@shared/ui";
import { Plus } from "@shared/icons/mono";

const AVATAR_SIZE = 120;
const ADD_BUTTON_SIZE = 32;

interface ProfileAvatarProps {
  onPress?: () => void;
}

export const ProfileAvatar = React.memo(({ onPress }: ProfileAvatarProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Avatar size={AVATAR_SIZE} />
      <Pressable
        onPress={onPress}
        style={[styles.addButton, { backgroundColor: colors.brand.primary }]}
      >
        <Plus size={16} color={colors.static.white} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: ADD_BUTTON_SIZE,
    height: ADD_BUTTON_SIZE,
    borderRadius: ADD_BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
