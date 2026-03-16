import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar } from "@shared/ui";
import { MealCalendar, MealCard, useCalendar, ROW_HEIGHT } from "@widgets/meal";

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
  const scrollY = useSharedValue(0);

  const rowCount = Math.ceil(calendar.monthDates.length / 7);
  const collapsibleHeight = (rowCount - 1) * ROW_HEIGHT;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const spacerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, collapsibleHeight],
      [0, collapsibleHeight],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar>
        <TopNavBar.Title>{`${calendar.month + 1}월 급식`}</TopNavBar.Title>
      </TopNavBar>

      <MealCalendar calendar={calendar} scrollY={scrollY} />

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        contentOffset={{ x: 0, y: collapsibleHeight }}
        bounces
      >
        <Animated.View style={spacerStyle} />
        <MealCard type="breakfast" calorie={MOCK_MENUS.breakfast.calorie} menus={MOCK_MENUS.breakfast.menus} />
        <MealCard type="lunch" calorie={MOCK_MENUS.lunch.calorie} menus={MOCK_MENUS.lunch.menus} />
        <MealCard type="dinner" calorie={MOCK_MENUS.dinner.calorie} menus={MOCK_MENUS.dinner.menus} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 140,
  },
});
