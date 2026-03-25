import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { TopNavBar, TextField, FilledButton, TextAreaProvider } from "@shared/ui";
import { useSlideAnimation } from "@shared/hooks/animations/useSlideAnimation";
import type { Role } from "@features/register/types";

interface CreateAccountRouteParams {
  role: Role;
  name: string;
  extraField: string;
  phone: string;
}

export const CreateAccountPage = () => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as CreateAccountRouteParams;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const showPassword = username.trim().length >= 5;
  const showPasswordConfirm = showPassword && password.length >= 1;
  const passwordMatch = password.length > 0 && password === passwordConfirm;
  const canSubmit = showPasswordConfirm && passwordMatch;

  const { animatedStyle: passwordStyle } = useSlideAnimation({
    visible: showPassword,
    direction: "up",
    distance: 12,
  });

  const { animatedStyle: passwordConfirmStyle } = useSlideAnimation({
    visible: showPasswordConfirm,
    direction: "up",
    distance: 12,
  });

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignUp = useCallback(() => {
    // TODO: API 호출 (params.role, params.name, params.extraField, params.phone, username, password)
  }, [params, username, password]);

  const passwordError = showPasswordConfirm && passwordConfirm.length > 0 && !passwordMatch;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TopNavBar left={<TopNavBar.BackButton onPress={handleBack} />} />

        <TextAreaProvider style={styles.content}>
          <Text style={[typo("Title3", "Bold"), styles.title, { color: colors.text.primary }]}>
            {"아이디와 비밀번호를\n설정해 주세요"}
          </Text>

          <View style={styles.fields}>
            {showPasswordConfirm && (
              <Animated.View style={passwordConfirmStyle}>
                <TextField
                  type="password"
                  label="비밀번호 확인"
                  value={passwordConfirm}
                  onChangeText={setPasswordConfirm}
                  isError={passwordError}
                  supportingText={passwordError ? "비밀번호가 일치하지 않아요" : undefined}
                />
              </Animated.View>
            )}

            {showPassword && (
              <Animated.View style={passwordStyle}>
                <TextField
                  type="password"
                  label="비밀번호"
                  value={password}
                  onChangeText={setPassword}
                />
              </Animated.View>
            )}

            <TextField
              type="text"
              label="아이디"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </TextAreaProvider>

        <View style={styles.bottom}>
          <FilledButton
            size="large"
            display="fill"
            disabled={!canSubmit}
            onPress={handleSignUp}
          >
            가입하기
          </FilledButton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 12,
    marginBottom: 32,
  },
  fields: {
    gap: 20,
  },
  bottom: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});
