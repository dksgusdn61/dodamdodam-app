import React, { useState, useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { usePressAnimation } from "@shared/hooks";
import { Avatar } from "@shared/ui";
import { B1NDLogo } from "@shared/icons/logo";
import { useProfileSuspense } from "./hooks/useProfile";
import { styles } from "./styles";

interface ProfileCardProps {
  onPress?: () => void;
}

export const ProfileCardComponent = ({ onPress }: ProfileCardProps) => {
  const { colors } = useTheme();
  const user = useProfileSuspense();
  const { animatedStyle, handlePressIn, handlePressOut } =
    usePressAnimation({ scale: 0.97 });

  const [imgError, setImgError] = useState(false);
  const onImageError = useCallback(() => setImgError(true), []);

  const isAdmin = user.roles?.includes("ADMIN") ?? false;
  const isStudent = user.roles?.includes("STUDENT") ?? false;

  const roleLabel = isStudent && user.student
    ? `${user.student.grade}학년 ${user.student.room}반 ${user.student.number}번`
    : user.teacher?.position ?? "";

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        {user.profileImage && !imgError ? (
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} onError={onImageError} />
        ) : (
          <Avatar size={64} />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.greeting, { color: colors.text.primary }]}>
            환영합니다, {user.name}님
          </Text>
          <View style={styles.roleLabelRow}>
            {isAdmin && <B1NDLogo width={30} height={8} color={colors.brand.primary} />}
            <Text style={[styles.roleLabel, { color: colors.text.tertiary }]}>
              {roleLabel}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};