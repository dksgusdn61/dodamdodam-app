import type { ColorTokens } from "@shared/tokens";

export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getFilledLabelColor = (
  isFocused: boolean,
  isDisabled: boolean,
  isError: boolean,
  colors: ColorTokens
): string => {
  if (isDisabled) return hexToRgba(colors.text.disabled, 0.65);
  if (isError) return colors.status.error;
  if (isFocused) return colors.brand.primary;
  return colors.text.tertiary;
};

export const getFilledBorderColor = (
  isFocused: boolean,
  isDisabled: boolean,
  isError: boolean,
  colors: ColorTokens
): string => {
  if (isDisabled) return hexToRgba(colors.border.disabled, 0.65);
  if (isError) return colors.status.error;
  if (isFocused) return colors.brand.primary;
  return colors.border.normal;
};

export const getFilledBackgroundColor = (
  isFocused: boolean,
  isError: boolean
): string => {
  if (isError) return hexToRgba("#E52222", 0.03);
  if (isFocused) return hexToRgba("#008BFF", 0.03);
  return "transparent";
};
