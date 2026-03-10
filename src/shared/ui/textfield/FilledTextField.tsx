import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import {
  XmarkCircle,
  Eye,
  EyeSlash,
  ExclamationmarkCircle,
} from "@shared/icons/mono";
import {
  hexToRgba,
  getFilledLabelColor,
  getFilledBorderColor,
  getFilledBackgroundColor,
} from "./textFieldUtils";

type InputType = "text" | "password";

interface FilledTextFieldProps {
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
}

export const FilledTextField = ({
  type = "text",
  label,
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
}: FilledTextFieldProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isShowValue, setIsShowValue] = useState(false);

  const hasValue = value.length > 0;

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
      {label ? (
        <Text
          style={[
            styles.label,
            { color: getFilledLabelColor(isFocused, disabled, isError, colors) },
          ]}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: getFilledBorderColor(isFocused, disabled, isError, colors),
            backgroundColor: getFilledBackgroundColor(isFocused, isError),
            borderRadius: shapes.medium,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password" && !isShowValue}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={
            disabled
              ? hexToRgba(colors.text.disabled, 0.65)
              : colors.text.placeholder
          }
        />
        {renderIcon()}
      </View>
      {supportingText ? (
        <Text
          style={[
            styles.supportingText,
            {
              color: disabled
                ? hexToRgba(colors.text.disabled, 0.65)
                : isError
                  ? colors.status.error
                  : colors.text.tertiary,
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
    gap: 4,
  },
  label: {
    ...typo("Label", "Medium"),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingLeft: 16,
    paddingRight: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    ...typo("Headline", "Medium"),
    lineHeight: undefined,
    paddingVertical: 0,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  supportingText: {
    ...typo("Label", "Medium"),
  },
});

export type { FilledTextFieldProps };
