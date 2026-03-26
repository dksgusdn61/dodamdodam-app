import React, { memo, useCallback, isValidElement, cloneElement } from "react";
import { View } from "react-native";
import { useOverlay } from "@shared/ui/overlay";

interface PickerTriggerProps {
  children: React.ReactElement;
  content: (props: {
    onClose: () => void;
    setDimClickHandler: (handler: () => void) => void;
  }) => React.ReactNode;
  position?: "bottom" | "top";
}

export const PickerTrigger = memo(
  ({ children, content }: PickerTriggerProps) => {
    const overlay = useOverlay();

    const handleTriggerPress = useCallback(() => {
      overlay.open(({ close, setDimClickHandler }) =>
        content({ onClose: close, setDimClickHandler })
      );
    }, [overlay, content]);

    const trigger = isValidElement(children)
      ? cloneElement(
          children as React.ReactElement<{ onPress?: () => void }>,
          { onPress: handleTriggerPress }
        )
      : children;

    return <View>{trigger}</View>;
  }
);

PickerTrigger.displayName = "PickerTrigger";

export type { PickerTriggerProps };