import React from "react";
import { View } from "react-native";
import { useTheme } from "@shared/theme";
import { Skeleton } from "@shared/ui";
import { styles } from "./styles";

export const ProfileCardSkeleton = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.surface }]}>
      <Skeleton width={64} height={64} radius={50} />
      <View style={styles.textContainer}>
        <Skeleton width={160} height={20} radius={4} />
        <Skeleton width={100} height={14} radius={4} />
      </View>
    </View>
  );
};