import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { FilledButton } from "@shared/ui";

export const readNfcTag = async (): Promise<string | null> => {
  await NfcManager.requestTechnology(NfcTech.Ndef);
  const tag = await NfcManager.getTag();

  if (!tag?.ndefMessage?.length) return null;

  const record = tag.ndefMessage[0];
  return Ndef.text.decodePayload(new Uint8Array(record.payload));
};

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.4}
    pressBehavior="none"
  />
);

const PulseRing = () => {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
  }, [progress]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.4, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.3]) }],
  }));

  return (
    <Animated.View
      style={[styles.ring, { borderColor: colors.brand.primary }, ringStyle]}
    />
  );
};

interface NfcReadResult {
  value: string;
}

export const useNfcRead = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const resolveRef = useRef<((result: NfcReadResult | null) => void) | null>(null);

  const scan = useCallback((): Promise<NfcReadResult | null> => {
    return new Promise(async (resolve) => {
      if (Platform.OS === "ios") {
        try {
          const data = await readNfcTag();
          resolve(data ? { value: data } : null);
        } catch {
          resolve(null);
        } finally {
          NfcManager.cancelTechnologyRequest().catch(() => {});
        }
        return;
      }

      // Android: show bottom sheet
      resolveRef.current = resolve;
      sheetRef.current?.present();

      try {
        const data = await readNfcTag();
        sheetRef.current?.dismiss();
        resolve(data ? { value: data } : null);
      } catch {
        sheetRef.current?.dismiss();
        resolve(null);
      } finally {
        NfcManager.cancelTechnologyRequest().catch(() => {});
        resolveRef.current = null;
      }
    });
  }, []);

  const handleDismiss = useCallback(() => {
    NfcManager.cancelTechnologyRequest().catch(() => {});
    if (resolveRef.current) {
      resolveRef.current(null);
      resolveRef.current = null;
    }
  }, []);

  const handleCancel = useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);

  const NfcSheet = useCallback(() => {
    const { colors } = useTheme();

    return (
      <BottomSheetModal
        ref={sheetRef}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={Backdrop}
        backgroundStyle={{ backgroundColor: colors.background.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.fill.secondary }}
        onDismiss={handleDismiss}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.pulseWrapper}>
            <PulseRing />
            <View style={[styles.iconCircle, { backgroundColor: colors.brand.primary }]}>
              <Text style={styles.iconText}>NFC</Text>
            </View>
          </View>
          <View style={styles.textGroup}>
            <Text style={[typo("Heading2", "Bold"), { color: colors.text.primary }]}>
              스캔 준비 완료
            </Text>
            <Text style={[typo("Body2", "Regular"), { color: colors.text.tertiary }]}>
              기기 뒷면을 NFC 태그에 가까이 대주세요
            </Text>
          </View>
          <FilledButton
            size="large"
            display="fill"
            onPress={handleCancel}
          >
            취소
          </FilledButton>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }, [handleDismiss, handleCancel]);

  return { scan, NfcSheet };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 16,
  },
  textGroup: {
    alignItems: "center",
    gap: 4,
  },
  pulseWrapper: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    ...typo("Caption1", "Bold"),
    color: "#fff",
    letterSpacing: 0.5,
  },
});
