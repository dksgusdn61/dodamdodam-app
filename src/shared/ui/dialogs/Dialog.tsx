import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { useWiggle } from "@shared/hooks";
import { typo, shapes } from "@shared/tokens";
import { FilledButton, TextButton } from "@shared/ui/buttons";

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  closeOnDimmerClick?: boolean;
  onClose?: () => void;
  onExited?: () => void;
  setDimClickHandler?: (handler: () => void) => void;
  children?: React.ReactNode;
}

const DialogComponent = memo(({
  open,
  title,
  description,
  closeOnDimmerClick = false,
  onClose,
  setDimClickHandler,
  children,
}: DialogProps) => {
  const { colors } = useTheme();
  const { wiggleStyle } = useWiggle({
    closeOnDimmerClick,
    onClose,
    setDimClickHandler,
  });

  return (
    <Animated.View
      style={[
        styles.modal,
        {
          backgroundColor: colors.background.surface,
          borderRadius: shapes.extraLarge,
        },
        wiggleStyle,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {title}
        </Text>
        {description ? (
          <Text style={[styles.description, { color: colors.text.tertiary }]}>
            {description}
          </Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>{children}</View>
    </Animated.View>
  );
});

DialogComponent.displayName = "Dialog";

const DialogFilledButton = memo(
  (props: React.ComponentProps<typeof FilledButton>) => (
    <FilledButton size="large" display="fill" {...props} />
  )
);

DialogFilledButton.displayName = "Dialog.FilledButton";

const DialogTextButton = memo(
  (props: React.ComponentProps<typeof TextButton>) => (
    <TextButton size="large" display="fill" {...props} />
  )
);

DialogTextButton.displayName = "Dialog.TextButton";

export const Dialog = Object.assign(DialogComponent, {
  FilledButton: DialogFilledButton,
  TextButton: DialogTextButton,
});

const styles = StyleSheet.create({
  modal: {
    width: 320,
    padding: 18,
  },
  content: {
    gap: 12,
    padding: 6,
  },
  title: {
    ...typo("Heading1", "Bold"),
  },
  description: {
    ...typo("Body1", "Medium"),
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,
  },
});
