export const shapes = {
  extraSmall: 8,
  small: 10,
  medium: 12,
  large: 18,
  extraLarge: 28,
} as const;

export type ShapeToken = keyof typeof shapes;
