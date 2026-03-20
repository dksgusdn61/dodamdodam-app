import React, { useCallback, useState, type ReactNode } from "react";
import { RefreshControl, ScrollView, type ScrollViewProps } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useTheme } from "@shared/theme";

const MIN_REFRESH_MS = 600;

interface RefreshViewProps extends Omit<ScrollViewProps, "refreshControl"> {
  queryKeys?: readonly (readonly unknown[])[];
  children: ReactNode;
}

export const RefreshView = ({ queryKeys, children, ...scrollProps }: RefreshViewProps) => {
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    Haptics.selectionAsync();

    await new Promise((r) => setTimeout(r, MIN_REFRESH_MS));

    if (queryKeys && queryKeys.length > 0) {
      queryKeys.forEach((key) => queryClient.removeQueries({ queryKey: key }));
    } else {
      queryClient.removeQueries();
    }

    setRefreshing(false);
  }, [queryClient, queryKeys]);

  return (
    <ScrollView
      {...scrollProps}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.text.tertiary}
          colors={[colors.brand.primary]}
        />
      }
    >
      {children}
    </ScrollView>
  );
};