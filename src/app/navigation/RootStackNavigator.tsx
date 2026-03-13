import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { iosSlideTransition } from "./iosSlideTransition";
import { AppInInfoPage } from "@pages/appIn";

const Stack = createStackNavigator();

export const RootStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...iosSlideTransition,
      headerShown: false,
    }}
  >
    <Stack.Screen name="Main" component={BottomTabNavigator} />
    <Stack.Screen name="AppIn" component={AppInInfoPage} />
  </Stack.Navigator>
);
