import React, { useState, useCallback } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { TopNavBar, TextField, FilledButton, TextAreaProvider } from "@shared/ui";
import { DatePickerRow, useOutSleepingApply } from "@features/outing";

export const OutingApplyPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { apply, loading } = useOutSleepingApply();
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? 0 : 7 - day;
    const sunday = new Date(now);
    sunday.setDate(now.getDate() + diff);
    return sunday;
  });
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = day <= 1 ? 1 - day : 8 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    return monday;
  });

  const handleSubmit = useCallback(async () => {
    const success = await apply({ reason, startDate, endDate });
    if (success) navigation.goBack();
  }, [apply, reason, startDate, endDate, navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top", "bottom"]}
    >
      <TopNavBar
        left={<TopNavBar.BackButton onPress={() => navigation.goBack()} />}
      >
        <TopNavBar.Title hasBackButton>외출/외박 신청하기</TopNavBar.Title>
      </TopNavBar>

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TextAreaProvider style={styles.inner}>
          <View style={styles.form}>
            <TextField
              label="외박 사유"
              value={reason}
              onChangeText={setReason}
            />
            <DatePickerRow label="외출 날짜" date={startDate} onChangeDate={setStartDate} />
            <DatePickerRow label="복귀 날짜" date={endDate} onChangeDate={setEndDate} />
          </View>

          <View style={styles.spacer} />

          <FilledButton
            size="large"
            display="fill"
            isLoading={loading}
            onPress={handleSubmit}
          >
            신청
          </FilledButton>
        </TextAreaProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  form: {
    gap: 16,
  },
  spacer: {
    flex: 1,
  },
});