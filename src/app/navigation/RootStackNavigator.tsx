import React from "react";
import { Animated } from "react-native";
import {
  createStackNavigator,
  type StackCardInterpolationProps,
  type StackCardInterpolatedStyle,
} from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { AppInfoPage } from "@pages/app-info";

const Stack = createStackNavigator();

const OVERLAY_OPACITY = 0.3;

function slideFromRight({
  current,
  next,
  inverted,
  layouts: { screen },
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  const translateFocused = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: "clamp",
    }),
    inverted,
  );

  const translateUnfocused = next
    ? Animated.multiply(
        next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, screen.width * -0.3],
          extrapolate: "clamp",
        }),
        inverted,
      )
    : 0;

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, OVERLAY_OPACITY],
    extrapolate: "clamp",
  });

  return {
    cardStyle: {
      transform: [
        { translateX: translateFocused },
        { translateX: translateUnfocused },
      ],
    },
    overlayStyle: { opacity: overlayOpacity },
  };
}

const transitionSpec = {
  animation: "spring" as const,
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

export const RootStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyleInterpolator: slideFromRight,
      transitionSpec: { open: transitionSpec, close: transitionSpec },
      gestureEnabled: true,
      gestureDirection: "horizontal",
    }}
  >
    <Stack.Screen name="Main" component={BottomTabNavigator} />
    <Stack.Screen name="AppInfo" component={AppInfoPage} />
  </Stack.Navigator>
);
