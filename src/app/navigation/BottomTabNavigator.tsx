import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, ForkAndKnife, DoorOpen, MoonPlus, Menu } from "@shared/icons/mono";
import { BottomTabBar } from "@widgets/bottom-tab-bar";
import { HomePage } from "@pages/home";
import { MealPage } from "@pages/meal";
import { OutingPage } from "@pages/outing";
import { NightStudyPage } from "@pages/night-study";
import { MorePage } from "@pages/more";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Meal"
        component={MealPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ForkAndKnife size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Outing"
        component={OutingPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <DoorOpen size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NightStudy"
        component={NightStudyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MoonPlus size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MorePage}
        options={{
          tabBarIcon: ({ color, size }) => <Menu size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
