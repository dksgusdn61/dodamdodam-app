import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const FADE_OUT_MS = 100;
const FADE_IN_MS = 150;

type Phase = "idle" | "out" | "in";

interface UseSwitcherOptions {
  pages: ReactNode[];
  current: number;
  animated: boolean;
}

export const useSwitcher = ({ pages, current, animated }: UseSwitcherOptions) => {
  const [rendered, setRendered] = useState<ReactNode>(pages[current] ?? null);
  const [phase, setPhase] = useState<Phase>("idle");
  const lastIndexRef = useRef(current);
  const isFirstRef = useRef(true);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const next = pages[current] ?? null;

    if (isFirstRef.current) {
      isFirstRef.current = false;
      lastIndexRef.current = current;
      setRendered(next);
      setPhase("idle");
      return;
    }

    if (lastIndexRef.current === current) {
      setRendered(next);
      return;
    }

    lastIndexRef.current = current;
    setPhase("out");

    const outTimer = setTimeout(() => {
      setRendered(next);
      setPhase("in");

      const inTimer = setTimeout(() => {
        setPhase("idle");
      }, animated ? FADE_IN_MS : 0);

      return () => clearTimeout(inTimer);
    }, animated ? FADE_OUT_MS : 0);

    return () => clearTimeout(outTimer);
  }, [current, pages, animated]);

  useEffect(() => {
    if (phase === "out") {
      opacity.value = withTiming(0, { duration: FADE_OUT_MS });
    } else if (phase === "in") {
      opacity.value = withTiming(1, { duration: FADE_IN_MS });
    } else {
      opacity.value = withTiming(1, { duration: 0 });
    }
  }, [phase, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { rendered, animatedStyle };
};
