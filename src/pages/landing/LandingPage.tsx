import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { AppLogo } from "@shared/ui/topNavBar/AppLogo";
import { B1ndLogo } from "@shared/icons/logo";

const SPLASH_DURATION = 2000;
const APP_LOGO_WIDTH = 176;
const APP_LOGO_HEIGHT = 44;

export const LandingPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }),
      );
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <View style={styles.center}>
        <AppLogo width={APP_LOGO_WIDTH} height={APP_LOGO_HEIGHT} />
      </View>
      <View style={[styles.bottom, { paddingBottom: bottom + 20 }]}>
        <B1ndLogo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    alignItems: "center",
  },
});
