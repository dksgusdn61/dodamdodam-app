import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { notificationApi } from "@entities/notification/api";
import type { Notification } from "@entities/notification/types";
import { NotificationItem } from "./NotificationItem";
import { NotificationListSkeleton } from "./NotificationListSkeleton";

const LIMIT = 10;

export interface NotificationListRef {
  readAll: () => Promise<void>;
}

const _NotificationList = forwardRef<NotificationListRef>((_, ref) => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const offsetRef = useRef(0);
  const loadingMoreRef = useRef(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const { data } = await notificationApi.getMy({ limit: LIMIT, offset: 0 });
      setNotifications(data.data.content);
      setHasNext(data.data.hasNext);
      offsetRef.current = 1;
    } catch {
      setNotifications([]);
      setHasNext(false);
    }
  }, []);

  const initialFetch = useCallback(async () => {
    setLoading(true);
    await fetchNotifications();
    setLoading(false);
  }, [fetchNotifications]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  }, [fetchNotifications]);

  const loadMore = useCallback(async () => {
    if (!hasNext || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    try {
      const { data } = await notificationApi.getMy({ limit: LIMIT, offset: offsetRef.current });
      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const newItems = data.data.content.filter((n) => !existingIds.has(n.id));
        return [...prev, ...newItems];
      });
      setHasNext(data.data.hasNext);
      offsetRef.current += 1;
    } catch {
      // 실패 시 현재 상태 유지
    } finally {
      loadingMoreRef.current = false;
    }
  }, [hasNext]);

  const handlePress = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    notificationApi.markAsRead(id).catch(() => {});
  }, []);

  useImperativeHandle(ref, () => ({
    readAll: async () => {
      try {
        await notificationApi.readAll();
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      } catch {}
    },
  }));

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  if (loading) return <NotificationListSkeleton />;

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NotificationItem item={item} onPress={handlePress} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.text.tertiary}
        />
      }
      ListEmptyComponent={
        <Text style={[typo("Body1", "Regular"), styles.empty, { color: colors.text.tertiary }]}>
          알림이 없어요.
        </Text>
      }
      ListFooterComponent={
        hasNext ? (
          <NotificationListSkeleton count={3} />
        ) : notifications.length > 0 ? (
          <Text style={[typo("Caption1", "Regular"), styles.footer, { color: colors.text.tertiary }]}>
            일주일 전 알림까지 확인할 수 있어요
          </Text>
        ) : null
      }
    />
  );
});

export const NotificationList = Object.assign(_NotificationList, {
  Skeleton: NotificationListSkeleton,
});

const styles = StyleSheet.create({
  footer: {
    textAlign: "center",
    paddingVertical: 24,
  },
  empty: {
    textAlign: "center",
    paddingVertical: 48,
  },
});
