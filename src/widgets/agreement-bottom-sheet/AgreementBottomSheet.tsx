import React, { useRef, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import { Checkbox, FilledButton, BottomSheet, type BottomSheetRef } from "@shared/ui";
import { useAgreement } from "./useAgreement";
import { AgreementItem } from "./AgreementItem";

interface AgreementBottomSheetProps {
  onAgree: () => void;
}

export const AgreementBottomSheet = React.forwardRef<BottomSheetRef, AgreementBottomSheetProps>(
  ({ onAgree }, ref) => {
    const { colors } = useTheme();
    const { bottom } = useSafeAreaInsets();
    const {
      privacyChecked,
      termsChecked,
      allChecked,
      toggleAll,
      togglePrivacy,
      toggleTerms,
    } = useAgreement();

    const handleNext = useCallback(() => {
      if (allChecked) onAgree();
    }, [allChecked, onAgree]);

    return (
      <BottomSheet ref={ref} enableDynamicSizing>
        <View style={[styles.content, { paddingBottom: bottom + 16 }]}>
          <View style={styles.header}>
            <Text style={[typo("Heading2", "Bold"), { color: colors.text.primary }]}>
              회원가입을 하기 위해 동의가 필요해요
            </Text>
            <Text style={[typo("Body1", "Medium"), { color: colors.text.tertiary, lineHeight: 20 }]}>
              도담도담에 가입하기 위해 서비스 이용약관과 개인정보처리방침 동의가 필요해요
            </Text>
          </View>

          <Pressable
            onPress={toggleAll}
            style={[
              styles.allCheckRow,
              { backgroundColor: colors.fill.primary, borderRadius: shapes.medium },
            ]}
          >
            <Checkbox size="medium" variant="outlined" selected={allChecked} onPress={toggleAll} />
            <Text style={[typo("Body1", "Medium"), { color: colors.text.primary }]}>
              필수 항목 모두 체크하기
            </Text>
          </Pressable>

          <View style={styles.items}>
            <AgreementItem
              label="[필수] 개인정보 수집 및 이용에 대한 안내"
              checked={privacyChecked}
              onPress={togglePrivacy}
            />
            <AgreementItem
              label="[필수] 서비스 이용약관"
              checked={termsChecked}
              onPress={toggleTerms}
            />
          </View>

          <FilledButton size="large" display="fill" disabled={!allChecked} onPress={handleNext}>
            다음
          </FilledButton>
        </View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    gap: 0,
  },
  header: {
    gap: 8,
    marginBottom: 24,
  },
  allCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  items: {
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
});
