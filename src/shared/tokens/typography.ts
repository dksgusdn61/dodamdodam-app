import { TextStyle } from "react-native";

export type TypographyLevel =
  | "Title1"
  | "Title2"
  | "Title3"
  | "Heading1"
  | "Heading2"
  | "Headline"
  | "Body1"
  | "Body2"
  | "Label"
  | "Caption1"
  | "Caption2";

export type TypographyWeight =
  | "ExtraBold"
  | "Bold"
  | "SemiBold"
  | "Medium"
  | "Regular";

const fontWeights: Record<TypographyWeight, TextStyle["fontWeight"]> = {
  ExtraBold: "800",
  Bold: "700",
  SemiBold: "600",
  Medium: "500",
  Regular: "400",
};

interface TypographySpec {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  allowedWeights: TypographyWeight[];
}

const typographySpecs: Record<TypographyLevel, TypographySpec> = {
  Title1: {
    fontSize: 36,
    lineHeight: 36 * 1.3,
    letterSpacing: 36 * -0.03,
    allowedWeights: ["ExtraBold", "Medium", "Regular"],
  },
  Title2: {
    fontSize: 28,
    lineHeight: 28 * 1.3,
    letterSpacing: 28 * -0.03,
    allowedWeights: ["ExtraBold", "Medium", "Regular"],
  },
  Title3: {
    fontSize: 24,
    lineHeight: 24 * 1.3,
    letterSpacing: 24 * -0.03,
    allowedWeights: ["ExtraBold", "Medium", "Regular"],
  },
  Heading1: {
    fontSize: 22,
    lineHeight: 22 * 1.3,
    letterSpacing: 22 * -0.02,
    allowedWeights: ["ExtraBold", "Medium", "Regular"],
  },
  Heading2: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    letterSpacing: 20 * -0.01,
    allowedWeights: ["ExtraBold", "Medium", "Regular"],
  },
  Headline: {
    fontSize: 18,
    lineHeight: 18 * 1.5,
    letterSpacing: 0,
    allowedWeights: ["Bold", "Medium", "Regular"],
  },
  Body1: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
    letterSpacing: 16 * 0.01,
    allowedWeights: ["SemiBold", "Medium", "Regular"],
  },
  Body2: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    letterSpacing: 15 * 0.01,
    allowedWeights: ["SemiBold", "Medium", "Regular"],
  },
  Label: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * 0.02,
    allowedWeights: ["SemiBold", "Medium", "Regular"],
  },
  Caption1: {
    fontSize: 13,
    lineHeight: 13 * 1.3,
    letterSpacing: 13 * 0.03,
    allowedWeights: ["SemiBold", "Medium", "Regular"],
  },
  Caption2: {
    fontSize: 12,
    lineHeight: 12 * 1.3,
    letterSpacing: 12 * 0.03,
    allowedWeights: ["SemiBold", "Medium", "Regular"],
  },
};

export const typo = (level: TypographyLevel, weight: TypographyWeight): TextStyle => {
  const spec = typographySpecs[level];
  return {
    fontSize: spec.fontSize,
    lineHeight: spec.lineHeight,
    letterSpacing: spec.letterSpacing,
    fontWeight: fontWeights[weight],
  };
};

export { fontWeights, typographySpecs };
