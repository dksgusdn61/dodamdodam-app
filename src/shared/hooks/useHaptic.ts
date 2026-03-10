import { useCallback } from "react";
import * as Haptics from "expo-haptics";

export type HapticType = "light" | "medium" | "heavy" | "selection" | "success" | "warning" | "error";

const IMPACT_MAP: Record<string, Haptics.ImpactFeedbackStyle> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
};

const NOTIFICATION_MAP: Record<string, Haptics.NotificationFeedbackType> = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
};

export const useHaptic = (type: HapticType = "light") => {
  const trigger = useCallback(() => {
    if (type === "selection") {
      Haptics.selectionAsync();
      return;
    }

    const impact = IMPACT_MAP[type];
    if (impact !== undefined) {
      Haptics.impactAsync(impact);
      return;
    }

    const notification = NOTIFICATION_MAP[type];
    if (notification !== undefined) {
      Haptics.notificationAsync(notification);
    }
  }, [type]);

  return trigger;
};
