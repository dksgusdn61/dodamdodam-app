import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { useHaptic, useWiggle } from "@shared/hooks";
import { typo, shapes } from "@shared/tokens";
import { FilledButton } from "@shared/ui/buttons";

interface Time {
  hour: number;
  minute: number;
}

const ITEM_HEIGHT = 44;
const VISIBLE_COUNT = 5;

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const pad = (n: number) => n.toString().padStart(2, "0");

interface TimePickerProps {
  title?: string;
  time: Time;
  onChangeTime: (time: Time) => void;
  onClose?: () => void;
  closeOnDimmerClick?: boolean;
  setDimClickHandler?: (handler: () => void) => void;
}

interface WheelProps {
  data: number[];
  selectedValue: number;
  onValueChange: (value: number) => void;
}

const Wheel = ({ data, selectedValue, onValueChange }: WheelProps) => {
  const { colors } = useTheme();
  const triggerHaptic = useHaptic("selection");
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const index = data.indexOf(selectedValue);
    if (index >= 0 && scrollRef.current) {
      scrollRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, []);

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, data.length - 1));
      triggerHaptic();
      onValueChange(data[clampedIndex]);
    },
    [data, onValueChange, triggerHaptic]
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={[styles.wheel, { height: ITEM_HEIGHT * VISIBLE_COUNT }]}
      contentContainerStyle={{
        paddingVertical: ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2),
      }}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      onMomentumScrollEnd={handleMomentumEnd}
      nestedScrollEnabled
    >
      {data.map((value, i) => {
        const isActive = value === selectedValue;
        return (
          <View key={i} style={styles.item}>
            <Text
              style={[
                isActive
                  ? { ...typo("Title3", "Medium") }
                  : { ...typo("Heading1", "Regular") },
                {
                  color: isActive
                    ? colors.text.primary
                    : colors.text.tertiary,
                  opacity: isActive ? 1 : 0.5,
                },
              ]}
            >
              {pad(value)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export const TimePicker = memo(
  ({
    title = "시간 선택",
    time,
    onChangeTime,
    onClose,
    closeOnDimmerClick = false,
    setDimClickHandler,
  }: TimePickerProps) => {
    const { colors } = useTheme();
    const { wiggleStyle } = useWiggle({
      closeOnDimmerClick,
      onClose,
      setDimClickHandler,
    });
    const [selected, setSelected] = useState<Time>(time);

    const handleHourChange = useCallback((hour: number) => {
      setSelected((prev) => ({ ...prev, hour }));
    }, []);

    const handleMinuteChange = useCallback((minute: number) => {
      setSelected((prev) => ({ ...prev, minute }));
    }, []);

    const handleConfirm = useCallback(() => {
      onChangeTime(selected);
      onClose?.();
    }, [onChangeTime, selected, onClose]);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.background.surface,
            borderRadius: shapes.extraLarge,
          },
          wiggleStyle,
        ]}
      >
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {title}
        </Text>

        <View style={styles.picker}>
          <Wheel
            data={HOURS}
            selectedValue={selected.hour}
            onValueChange={handleHourChange}
          />
          <Text style={[styles.colon, { color: colors.text.primary }]}>:</Text>
          <Wheel
            data={MINUTES}
            selectedValue={selected.minute}
            onValueChange={handleMinuteChange}
          />
          <View
            style={[
              styles.highlight,
              {
                backgroundColor: colors.fill.secondary,
                borderRadius: shapes.small,
              },
            ]}
          />
        </View>

        <FilledButton size="large" onPress={handleConfirm}>
          선택
        </FilledButton>
      </Animated.View>
    );
  }
);

TimePicker.displayName = "TimePicker";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    ...typo("Heading2", "Bold"),
  },
  picker: {
    width: 280,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: ITEM_HEIGHT * VISIBLE_COUNT,
    position: "relative",
  },
  wheel: {
    paddingHorizontal: 20,
    zIndex: 2,
  },
  item: {
    height: ITEM_HEIGHT,
    minWidth: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  colon: {
    ...typo("Heading1", "Bold"),
    marginHorizontal: 8,
    zIndex: 2,
  },
  highlight: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 44,
    marginTop: -22,
    zIndex: 1,
  },
});

export type { TimePickerProps, Time };
