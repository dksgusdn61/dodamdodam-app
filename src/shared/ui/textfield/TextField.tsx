import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import {
  XmarkCircle,
  Eye,
  EyeSlash,
  ExclamationmarkCircle,
} from "@shared/icons/mono";
import { useTextField } from "./useTextField";

type InputType = "text" | "password";

interface TextFieldComponentProps {
  type?: InputType;
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isError?: boolean;
  showIcon?: boolean;
  disabled?: boolean;
  width?: number;
  supportingText?: string;
  customStyle?: ViewStyle;
  onRemoveClick?: () => void;
  placeholder?: string;
  onSubmitEditing?: () => void;
}

export const TextField = ({
  type = "text",
  label = "",
  value = "",
  onChangeText,
  isError = false,
  showIcon = true,
  disabled = false,
  width,
  supportingText,
  customStyle,
  onRemoveClick,
  placeholder,
  onSubmitEditing,
}: TextFieldComponentProps) => {
  const { colors } = useTheme();
  const {
    isFocused,
    setIsFocused,
    isShowValue,
    setIsShowValue,
    hasValue,
    labelAnimatedStyle,
    getBorderColor,
    getLabelColor,
  } = useTextField({ value, isError, disabled, colors });

  const renderIcon = () => {
    if (!showIcon || !hasValue) return null;

    if (isError) {
      return (
        <View style={styles.iconWrapper}>
          <ExclamationmarkCircle size={24} color={colors.status.error} />
        </View>
      );
    }

    if (type === "text") {
      return (
        <Pressable
          style={styles.iconWrapper}
          onPress={() => {
            onChangeText?.("");
            onRemoveClick?.();
          }}
        >
          <XmarkCircle size={24} color={colors.text.tertiary} />
        </Pressable>
      );
    }

    return (
      <Pressable
        style={styles.iconWrapper}
        onPress={() => setIsShowValue((prev) => !prev)}
      >
        {isShowValue ? (
          <Eye size={24} color={colors.text.tertiary} />
        ) : (
          <EyeSlash size={24} color={colors.text.tertiary} />
        )}
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, width ? { width } : undefined, customStyle]}>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text.primary,
              borderBottomColor: getBorderColor(),
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password" && !isShowValue}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={label ? undefined : placeholder}
          placeholderTextColor={label ? undefined : colors.text.placeholder}
          onSubmitEditing={onSubmitEditing}
        />
        {label ? (
          <Animated.Text
            style={[
              styles.label,
              { color: getLabelColor() },
              labelAnimatedStyle,
            ]}
            pointerEvents="none"
          >
            {label}
          </Animated.Text>
        ) : null}
        {renderIcon()}
      </View>
      {supportingText ? (
        <Text
          style={[
            styles.supportingText,
            {
              color: isError ? colors.status.error : colors.text.tertiary,
            },
          ]}
        >
          {supportingText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputRow: {
    position: "relative",
    height: 51,
    paddingVertical: 4,
    justifyContent: "flex-end",
  },
  input: {
    ...typo("Headline", "Medium"),
    width: "100%",
    height: 45,
    borderBottomWidth: 1.5,
    backgroundColor: "transparent",
    paddingRight: 32,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  label: {
    position: "absolute",
    left: 0,
    bottom: 16,
    ...typo("Headline", "Medium"),
  },
  iconWrapper: {
    position: "absolute",
    right: 0,
    bottom: 14,
  },
  supportingText: {
    ...typo("Label", "Medium"),
    marginTop: 4,
  },
});

export type { TextFieldComponentProps as TextFieldProps };
