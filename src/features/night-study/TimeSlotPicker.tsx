import React, { useRef, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { usePressAnimation } from "@shared/hooks";
import { Checkmark, ChevronUp, ChevronDown } from "@shared/icons/mono";

type TimeSlot = "NIGHT1" | "NIGHT2";

interface TimeSlotPickerProps {
  value: TimeSlot;
  onChange: (slot: TimeSlot) => void;
}

const SLOTS: { value: TimeSlot; label: string }[] = [
  { value: "NIGHT1", label: "심자 1" },
  { value: "NIGHT2", label: "심자 2" },
];

const getDisplayLabel = (slot: TimeSlot) =>
  SLOTS.find((s) => s.value === slot)?.label ?? "";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SlotOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const { colors } = useTheme();
  const { animatedStyle, brightnessOverlayStyle, handlePressIn, handlePressOut } =
    usePressAnimation();

  return (
    <AnimatedPressable
      style={[styles.option, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.optionOverlay, brightnessOverlayStyle]} pointerEvents="none" />
      <Text
        style={[
          styles.optionText,
          { color: selected ? colors.text.primary : colors.text.placeholder },
        ]}
      >
        {label}
      </Text>
      {selected && <Checkmark size={16} color={colors.brand.primary} />}
    </AnimatedPressable>
  );
};

export const TimeSlotPicker = ({ value, onChange }: TimeSlotPickerProps) => {
  const { colors } = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);

  const handleOpen = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const handleSelect = useCallback(
    (slot: TimeSlot) => {
      onChange(slot);
      sheetRef.current?.dismiss();
    },
    [onChange],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <>
      <Pressable style={styles.row} onPress={handleOpen}>
        <Text style={[styles.label, { color: colors.text.tertiary }]}>
          진행 시각
        </Text>
        <View style={styles.value}>
          <Text style={[styles.valueText, { color: colors.brand.primary }]}>
            {getDisplayLabel(value)}
          </Text>
          <View style={styles.chevrons}>
            <ChevronUp size={10} color={colors.brand.primary} />
            <ChevronDown size={10} color={colors.brand.primary} />
          </View>
        </View>
      </Pressable>

      <BottomSheetModal
        ref={sheetRef}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.fill.secondary }}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={[styles.sheetTitle, { color: colors.text.primary }]}>
            진행 시각
          </Text>
          <View style={styles.options}>
            {SLOTS.map((slot) => (
              <SlotOption
                key={slot.value}
                label={slot.label}
                selected={value === slot.value}
                onPress={() => handleSelect(slot.value)}
              />
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    ...typo("Headline", "Medium"),
  },
  value: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  valueText: {
    ...typo("Headline", "Regular"),
  },
  chevrons: {
    flexDirection: "column",
    alignItems: "center",
    gap: -4,
  },
  sheetContent: {
    paddingHorizontal: 16,
    paddingBottom: 48,
    gap: 8,
  },
  sheetTitle: {
    ...typo("Heading2", "Bold"),
    padding: 8,
  },
  options: {
    gap: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  optionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  optionText: {
    ...typo("Headline", "Medium"),
  },
});

export type { TimeSlot };