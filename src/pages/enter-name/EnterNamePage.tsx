import React, { useState, useCallback } from "react";
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import {
  TopNavBar,
  TextField,
  FilledTextField,
  FilledButton,
  TextAreaProvider,
  Dialog,
  useOverlay,
} from "@shared/ui";
import { TextButton } from "@shared/ui/buttons";
import { Role } from "@features/register/types";
import { validateStudentNumber } from "@features/register/validateStudentNumber";
import { formatPhoneNumber, parsePhoneDigits } from "@features/register/formatPhoneNumber";
import { useSlideAnimation } from "@shared/hooks/animations/useSlideAnimation";

interface EnterNameRouteParams {
  role: Role;
}

export const EnterNamePage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const overlay = useOverlay();
  const { role } = route.params as EnterNameRouteParams;

  const isStudent = role === Role.STUDENT;

  const [name, setName] = useState("");
  const [extraField, setExtraField] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = useCallback((text: string) => {
    setName(text.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
  }, []);

  const handleExtraFieldChange = useCallback((text: string) => {
    setExtraField(isStudent ? validateStudentNumber(text) : text);
  }, [isStudent]);

  const handlePhoneChange = useCallback((text: string) => {
    setPhone(parsePhoneDigits(text));
  }, []);

  const showExtraField = name.trim().length >= 2;
  const showPhoneField = showExtraField && (isStudent
    ? extraField.length === 4
    : extraField.trim().length >= 1);
  const showVerifyButton = showPhoneField && phone.length === 11;

  const { animatedStyle: extraFieldStyle } = useSlideAnimation({
    visible: showExtraField,
    direction: "up",
    distance: 12,
  });

  const { animatedStyle: phoneFieldStyle } = useSlideAnimation({
    visible: showPhoneField,
    direction: "up",
    distance: 12,
  });

  const { animatedStyle: verifyButtonStyle } = useSlideAnimation({
    visible: showVerifyButton,
    direction: "up",
    distance: 12,
  });

  const extraLabel = isStudent ? "학반번호 (예: 1101)" : "직책";

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendCode = useCallback(() => {
    overlay.open(({ isOpen, close, exit, setDimClickHandler }) => (
      <VerifyCodeDialog
        isOpen={isOpen}
        close={close}
        exit={exit}
        setDimClickHandler={setDimClickHandler}
        onVerified={() => {
          close();
          (navigation as any).navigate("CreateAccount", {
            role,
            name,
            extraField,
            phone,
          });
        }}
      />
    ));
  }, [overlay, navigation, role, name, extraField, phone]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TopNavBar left={<TopNavBar.BackButton onPress={handleBack} />} />

        <TextAreaProvider style={styles.content}>
          <Text style={[typo("Title3", "Bold"), styles.title, { color: colors.text.primary }]}>
            {"이름을\n입력해 주세요"}
          </Text>

          <View style={styles.fields}>
            {showPhoneField && (
              <Animated.View style={phoneFieldStyle}>
                <TextField
                  type="text"
                  label="전화번호"
                  value={formatPhoneNumber(phone)}
                  onChangeText={handlePhoneChange}
                  keyboardType="number-pad"
                />
              </Animated.View>
            )}

            {showExtraField && (
              <Animated.View style={extraFieldStyle}>
                <TextField
                  type="text"
                  label={extraLabel}
                  value={extraField}
                  onChangeText={handleExtraFieldChange}
                  keyboardType={isStudent ? "number-pad" : undefined}
                />
              </Animated.View>
            )}

            <TextField
              type="text"
              label="이름"
              value={name}
              onChangeText={handleNameChange}
            />
          </View>

          {showVerifyButton && (
            <Animated.View style={[styles.verifyButton, verifyButtonStyle]}>
              <FilledButton size="large" display="fill" onPress={handleSendCode}>
                전화번호 인증코드 전송
              </FilledButton>
            </Animated.View>
          )}
        </TextAreaProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

interface VerifyCodeDialogProps {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
  setDimClickHandler: (handler: () => void) => void;
  onVerified: () => void;
}

const VerifyCodeDialog = ({
  isOpen,
  close,
  exit,
  setDimClickHandler,
  onVerified,
}: VerifyCodeDialogProps) => {
  const [code, setCode] = useState("");

  const handleCodeChange = useCallback((text: string) => {
    setCode(text.replace(/[^0-9]/g, "").slice(0, 6));
  }, []);

  return (
    <Dialog
      open={isOpen}
      title="인증코드 입력"
      description="전송된 인증코드를 입력해주세요"
      closeOnDimmerClick
      onClose={close}
      onExited={exit}
      setDimClickHandler={setDimClickHandler}
    >
      <View style={dialogStyles.content}>
        <FilledTextField
          type="text"
          placeholder="인증코드 6자리"
          value={code}
          onChangeText={handleCodeChange}
          keyboardType="number-pad"
        />
        <View style={dialogStyles.buttons}>
          <TextButton size="large" onPress={close}>
            취소
          </TextButton>
          <FilledButton
            size="large"
            disabled={code.length !== 6}
            onPress={onVerified}
          >
            확인
          </FilledButton>
        </View>
      </View>
    </Dialog>
  );
};

const dialogStyles = StyleSheet.create({
  content: {
    width: "100%",
    gap: 16,
    marginTop: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});

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
  verifyButton: {
    marginTop: 24,
  },
});
