import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface UseSwitchOptions {
  checked: boolean;
  translate: number;
}

export const useSwitch = ({ checked, translate }: UseSwitchOptions) => {
  const translateX = useSharedValue(checked ? translate : 0);

  useEffect(() => {
    translateX.value = withTiming(checked ? translate : 0, {
      duration: 150,
    });
  }, [checked, translate, translateX]);

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { thumbAnimatedStyle };
};
