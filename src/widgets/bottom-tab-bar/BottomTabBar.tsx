import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SquircleView } from "react-native-figma-squircle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import {
  INDICATOR_SIZE,
  BAR_HEIGHT,
  BORDER_RADIUS,
  MARGIN_HORIZONTAL,
  MARGIN_BOTTOM,
} from "./constants";
import { useBottomTabBar } from "./useBottomTabBar";
import { TabItem } from "./TabItem";

export const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const onTabChange = useCallback(
    (index: number) => {
      const route = state.routes[index];
      if (route) {
        navigation.navigate(route.name, route.params);
      }
    },
    [state.routes, navigation],
  );

  const { onBarLayout, indicatorStyle, panGesture, translateX, barWidth } =
    useBottomTabBar({
    tabCount: state.routes.length,
    activeIndex: state.index,
    onTabChange,
  });

  return (
    <View
      style={[
        styles.outer,
        { paddingBottom: Math.max(insets.bottom, MARGIN_BOTTOM) },
      ]}
    >
      <GestureDetector gesture={panGesture}>
        <View
          style={[styles.bar, { backgroundColor: colors.background.surface }]}
          onLayout={onBarLayout}
        >
        <Animated.View style={[styles.indicator, indicatorStyle]}>
          <SquircleView
            style={styles.indicatorShape}
            squircleParams={{
              cornerRadius: 12,
              cornerSmoothing: 0.8,
              fillColor: colors.brand.primary,
            }}
          />
        </Animated.View>

        {state.routes.map((route, index) => (
          <TabItem
            key={route.key}
            route={route}
            index={index}
            tabCount={state.routes.length}
            descriptors={descriptors}
            navigation={navigation}
            isFocused={state.index === index}
            translateX={translateX}
            barWidth={barWidth}
          />
        ))}
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: MARGIN_HORIZONTAL,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: BAR_HEIGHT,
    borderRadius: BORDER_RADIUS,
  },
  indicator: {
    position: "absolute",
    left: 0,
    top: (BAR_HEIGHT - INDICATOR_SIZE) / 2,
  },
  indicatorShape: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
  },
});
