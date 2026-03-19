import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  clamp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar } from "@shared/ui";
import {
  MealCalendar,
  MealCard,
  useCalendar,
  ROW_HEIGHT,
  CALENDAR_NON_GRID_HEIGHT,
} from "@widgets/meal";

const MOCK_MENUS = {
  breakfast: {
    calorie: 709,
    menus: ["쇠고기우엉볶음밥", "불고기치즈파니니", "계란실파국", "오이생채", "배추김치"],
  },
  lunch: {
    calorie: 709,
    menus: ["발아현미밥", "맑은쇠고기무국", "매운갈비찜", "핫스모크연어스테이크/소스", "눈사람도너츠"],
  },
  dinner: {
    calorie: 709,
    menus: ["쇠고기우엉볶음밥", "불고기치즈파니니", "계란실파국", "오이생채", "배추김치"],
  },
};

export const MealPage = () => {
  const { colors } = useTheme();
  const calendar = useCalendar();
  const rowCount = Math.ceil(calendar.monthDates.length / 7);
  const collapsibleHeight = (rowCount - 1) * ROW_HEIGHT;
  const monthHeight = rowCount * ROW_HEIGHT;

  const scrollY = useSharedValue(collapsibleHeight);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // iOS: spacer compensates for calendar collapse inside ScrollView
  const spacerStyle = useAnimatedStyle(() => ({
    height: clamp(scrollY.value, 0, collapsibleHeight),
  }));

  const isAndroid = Platform.OS === "android";

  // Android: fixed spacer height = full calendar height (calendar is outside ScrollView)
  const androidSpacerHeight = monthHeight + CALENDAR_NON_GRID_HEIGHT;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar>
        <TopNavBar.Title>{`${calendar.month + 1}월 급식`}</TopNavBar.Title>
      </TopNavBar>

      <View style={styles.content}>
        <Animated.ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentOffset={{ x: 0, y: collapsibleHeight }}
          bounces
        >
          {isAndroid ? (
            <View style={{ height: androidSpacerHeight }} />
          ) : (
            <>
              <MealCalendar calendar={calendar} scrollY={scrollY} />
              <Animated.View style={spacerStyle} />
            </>
          )}
          <View style={styles.cardList}>
            <MealCard type="breakfast" calorie={MOCK_MENUS.breakfast.calorie} menus={MOCK_MENUS.breakfast.menus} />
            <MealCard type="lunch" calorie={MOCK_MENUS.lunch.calorie} menus={MOCK_MENUS.lunch.menus} />
            <MealCard type="dinner" calorie={MOCK_MENUS.dinner.calorie} menus={MOCK_MENUS.dinner.menus} />
          </View>
        </Animated.ScrollView>

        {/* Android: calendar overlays ScrollView — no stickyHeaderIndices, no translateY jitter */}
        {isAndroid && (
          <View style={styles.calendarOverlay} pointerEvents="box-none">
            <MealCalendar calendar={calendar} scrollY={scrollY} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  cardList: {
    padding: 16,
    gap: 12,
    paddingBottom: 140,
  },
  calendarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});