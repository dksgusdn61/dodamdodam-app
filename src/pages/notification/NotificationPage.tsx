import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import { TopNavBar } from "@shared/ui";
import { Megaphone, Calendar, Bell, Ellipsis } from "@shared/icons/mono";
import { formatRelativeTime } from "@shared/utils";

interface Notification {
  id: string;
  icon: "megaphone" | "calendar" | "bell";
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  appName?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: "megaphone",
    title: "새로운 공지사항",
    description: "3월 수련회 일정이 등록되었습니다. 확인해주세요.",
    date: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "2",
    icon: "calendar",
    title: "일정 알림",
    description: "내일 진행되는 모의고사가 있습니다.",
    date: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "3",
    icon: "bell",
    title: "기상송 투표",
    description: "이번 주 기상송 투표가 마감되었습니다.",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    appName: "기상송",
  },
  {
    id: "4",
    icon: "megaphone",
    title: "점심 메뉴 변경 안내",
    description: "3월 14일 점심 메뉴가 변경되었습니다.",
    date: "2026-03-10T12:00:00",
    isRead: true,
  },
];

const ICON_MAP = {
  megaphone: Megaphone,
  calendar: Calendar,
  bell: Bell,
};

const NotificationItem = ({ item }: { item: Notification }) => {
  const { colors } = useTheme();
  const Icon = ICON_MAP[item.icon];

  return (
    <Pressable style={styles.item}>
      <SquircleView
        style={styles.iconBox}
        squircleParams={{
          cornerRadius: 10,
          cornerSmoothing: 0.8,
          fillColor: colors.fill.secondary,
        }}
      >
        <Icon size={20} color={colors.text.tertiary} />
      </SquircleView>
      <View style={styles.itemContent}>
        <View style={styles.titleRow}>
          <View style={styles.titleLeft}>
            <Text style={[typo("Body1", "SemiBold"), { color: colors.text.primary }]}>
              {item.title}
            </Text>
            {!item.isRead && <View style={[styles.dot, { backgroundColor: colors.brand.primary }]} />}
          </View>
          <Text style={[typo("Caption1", "Regular"), { color: colors.text.tertiary }]}>
            {formatRelativeTime(item.date)}
          </Text>
        </View>
        <Text
          style={[typo("Body2", "Regular"), { color: colors.text.secondary }]}
          numberOfLines={1}
        >
          {item.description}
        </Text>
        {item.appName && (
          <Text style={[typo("Caption1", "Regular"), styles.appName, { color: colors.text.tertiary }]}>
            {item.appName}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export const NotificationPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const recentItems = MOCK_NOTIFICATIONS.filter((n) => !n.isRead);
  const pastItems = MOCK_NOTIFICATIONS.filter((n) => n.isRead);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar
        left={<TopNavBar.BackButton onPress={() => navigation.goBack()} />}
        right={<TopNavBar.IconButton icon={<Ellipsis />} onPress={() => {}} />}
      >
        <TopNavBar.Title hasBackButton>알림</TopNavBar.Title>
      </TopNavBar>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            {recentItems.map((item) => (
              <NotificationItem key={item.id} item={item} />
            ))}

            {pastItems.length > 0 && (
              <>
                <View style={[styles.divider, { borderBottomColor: colors.border.normal }]} />
                <Text
                  style={[
                    typo("Body2", "SemiBold"),
                    styles.sectionTitle,
                    { color: colors.text.secondary },
                  ]}
                >
                  지난 알림
                </Text>
                {pastItems.map((item) => (
                  <NotificationItem key={item.id} item={item} />
                ))}
              </>
            )}

            <Text
              style={[
                typo("Caption1", "Regular"),
                styles.footer,
                { color: colors.text.tertiary },
              ]}
            >
              일주일 전 알림까지 확인할 수 있어요
            </Text>
          </>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  itemContent: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  appName: {
    marginTop: 2,
  },
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  footer: {
    textAlign: "center",
    paddingVertical: 24,
  },
});
