import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { iosSlideTransition } from "./iosSlideTransition";
import { LandingPage } from "@pages/landing";
import { LoginPage } from "@pages/login";
import { LoginFormPage } from "@pages/login-form";
import { AppInInfoPage } from "@pages/appIn";
import { SettingsPage } from "@pages/settings";
import { EditProfilePage } from "@pages/edit-profile";
import { NotificationPage } from "@pages/notification";
import { SelectRolePage } from "@pages/select-role";
import { EnterNamePage } from "@pages/enter-name";
import { CreateAccountPage } from "@pages/create-account";

const Stack = createStackNavigator();

export const RootStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    screenOptions={{
      ...iosSlideTransition,
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Landing"
      component={LandingPage}
      options={{ gestureEnabled: false, cardStyleInterpolator: () => ({}) }}
    />
    <Stack.Screen
      name="Login"
      component={LoginPage}
      options={{ gestureEnabled: false, cardStyleInterpolator: () => ({}) }}
    />
    <Stack.Screen name="LoginForm" component={LoginFormPage} />
    <Stack.Screen name="Main" component={BottomTabNavigator} />
    <Stack.Screen name="AppIn" component={AppInInfoPage} />
    <Stack.Screen name="Settings" component={SettingsPage} />
    <Stack.Screen name="EditProfile" component={EditProfilePage} />
    <Stack.Screen name="Notification" component={NotificationPage} />
    <Stack.Screen name="SelectRole" component={SelectRolePage} />
    <Stack.Screen name="EnterName" component={EnterNamePage} />
    <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
  </Stack.Navigator>
);
