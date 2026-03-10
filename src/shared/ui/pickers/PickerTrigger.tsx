import React, { memo, useCallback, isValidElement, cloneElement } from "react";
import { View, StyleSheet } from "react-native";
import { useOverlay } from "@shared/ui/overlay";

interface PickerTriggerProps {
  children: React.ReactElement;
  content: (props: { onClose: () => void }) => React.ReactNode;
  position?: "bottom" | "top";
}

export const PickerTrigger = memo(
  ({ children, content }: PickerTriggerProps) => {
    const overlay = useOverlay();

    const handleTriggerPress = useCallback(() => {
      overlay.open(({ close }) => content({ onClose: close }));
    }, [overlay, content]);

    const trigger = isValidElement(children)
      ? cloneElement(
          children as React.ReactElement<{ onPress?: () => void }>,
          { onPress: handleTriggerPress }
        )
      : children;

    return <View style={styles.container}>{trigger}</View>;
  }
);

PickerTrigger.displayName = "PickerTrigger";

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
});

export type { PickerTriggerProps };
