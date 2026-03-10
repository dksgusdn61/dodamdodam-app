import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type SlideDirection = "up" | "down" | "left" | "right";

interface UseSlideAnimationOptions {
  visible: boolean;
  direction?: SlideDirection;
  distance?: number;
}

const getDirectionOffset = (
  direction: SlideDirection,
  distance: number,
): { x: number; y: number } => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
  }
};

export const useSlideAnimation = ({
  visible,
  direction = "up",
  distance = 20,
}: UseSlideAnimationOptions) => {
  const offset = getDirectionOffset(direction, distance);
  const translateX = useSharedValue(visible ? 0 : offset.x);
  const translateY = useSharedValue(visible ? 0 : offset.y);
  const opacity = useSharedValue(visible ? 1 : 0);

  const springConfig = {
    stiffness: 300,
    damping: 25,
    mass: 1,
  };

  useEffect(() => {
    const target = visible ? { x: 0, y: 0 } : offset;
    translateX.value = withSpring(target.x, springConfig);
    translateY.value = withSpring(target.y, springConfig);
    opacity.value = withSpring(visible ? 1 : 0, springConfig);
  }, [visible, direction, distance, translateX, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  return { animatedStyle, translateX, translateY, opacity };
};
