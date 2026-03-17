import React, { useState, useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTheme } from "@shared/theme";
import { usePressAnimation } from "@shared/hooks";
import { typo } from "@shared/tokens";
import { Avatar } from "@shared/ui";
import { userApi } from "@entities/user/api";
import { userQueryKeys } from "@entities/user/api/queryKeys";
import type { User } from "@entities/user/types";

const AVATAR_SIZE = 80;

const fetchMe = async (): Promise<User> => {
  const { data } = await userApi.getMe();
  return data.data;
};

interface SettingProfileProps {
  onEditPress?: () => void;
}

export const SettingProfile = React.memo(({ onEditPress }: SettingProfileProps) => {
  const { colors } = useTheme();
  const { animatedStyle, handlePressIn, handlePressOut } =
    usePressAnimation({ scale: 0.97 });

  const { data: user } = useSuspenseQuery({
    queryKey: userQueryKeys.me,
    queryFn: fetchMe,
  });

  const [imgError, setImgError] = useState(false);
  const showImage = user.profileImage && !imgError;

  return (
    <Pressable
      onPress={onEditPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        {showImage ? (
          <Image
            source={{ uri: user.profileImage! }}
            style={styles.avatar}
            onError={() => setImgError(true)}
          />
        ) : (
          <Avatar size={AVATAR_SIZE} />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: colors.text.primary }]}>
            {user.name}
          </Text>
          <Text style={[styles.editLabel, { color: colors.text.tertiary }]}>
            정보 수정
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
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
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
