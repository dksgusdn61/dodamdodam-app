import React, { useCallback } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@shared/theme";
import { Close } from "@shared/icons/mono";

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.4}
    pressBehavior="close"
  />
);

const SNAP_POINTS = ["90%"];

interface WebPopupProps {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  url: string;
  onDismiss?: () => void;
}

export const WebPopup = ({ sheetRef, url, onDismiss }: WebPopupProps) => {
  const { colors } = useTheme();

  const handleClose = useCallback(() => {
    sheetRef.current?.dismiss();
  }, [sheetRef]);

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={SNAP_POINTS}
      enableDynamicSizing={false}
      enablePanDownToClose
      backdropComponent={Backdrop}
      backgroundStyle={{ backgroundColor: colors.background.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.fill.secondary }}
      onDismiss={onDismiss}
    >
      <View style={styles.header}>
        <Pressable onPress={handleClose} hitSlop={8}>
          <Close size={24} color={colors.text.secondary} />
        </Pressable>
      </View>
      {url ? (
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  webview: {
    flex: 1,
  },
});
