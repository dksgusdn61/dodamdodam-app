import React, { memo, isValidElement, cloneElement } from "react";
import { View, Text, Pressable, StyleSheet, type ViewStyle } from "react-native";
import type { ReactElement } from "react";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import { usePressAnimation } from "@shared/hooks";
import { ArrowLeft } from "@shared/icons/mono";
import { IconButton } from "@shared/ui/buttons";
import type { IconButtonProps } from "@shared/ui/buttons";
import { AppLogo } from "./AppLogo";
import { useBackButton } from "./useBackButton";

interface TopNavBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  customStyle?: ViewStyle;
}

interface BackButtonProps {
  onPress?: () => void;
}

interface TitleProps {
  children: string;
  hasBackButton?: boolean;
}

interface LogoProps {
  children?: React.ReactNode;
}

const BackButton = memo(({ onPress }: BackButtonProps) => {
  const { colors } = useTheme();
  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation({
    scale: 0.9,
  });
  const { pressed, onPressIn, onPressOut } = useBackButton({
    handlePressIn,
    handlePressOut,
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.backButtonContainer}
    >
      <View
        style={[
          styles.backButtonBg,
          {
            backgroundColor: colors.fill.primary,
            opacity: pressed ? 1 : 0,
          },
        ]}
      />
      <Animated.View style={[styles.backButtonIcon, animatedStyle]}>
        <ArrowLeft size={24} color={colors.text.primary} />
      </Animated.View>
    </Pressable>
  );
});

BackButton.displayName = "BackButton";

const Title = memo(({ children, hasBackButton = false }: TitleProps) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        hasBackButton
          ? { ...typo("Headline", "Bold") }
          : { ...typo("Title3", "Bold") },
        { color: colors.text.primary },
      ]}
    >
      {children}
    </Text>
  );
});

Title.displayName = "Title";

const Logo = memo(({ children }: LogoProps) => {
  return <>{children ?? <AppLogo />}</>;
});

Logo.displayName = "Logo";

const ICON_SIZE = 24;

const NavIconButton = memo(
  ({ icon, iconSize: _, ...props }: IconButtonProps) => {
    const { colors } = useTheme();
    const styledIcon = isValidElement<{ color?: string }>(icon)
      ? cloneElement(icon as ReactElement<{ color?: string }>, {
          color: colors.text.tertiary,
        })
      : icon;

    return <IconButton icon={styledIcon} iconSize={ICON_SIZE} {...props} />;
  }
);

NavIconButton.displayName = "NavIconButton";

const TopNavBarComponent = memo(
  ({ left, right, children, customStyle }: TopNavBarProps) => {
    const { colors } = useTheme();

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background.default },
          customStyle,
        ]}
      >
        {left ? <View style={styles.leftContainer}>{left}</View> : null}
        <View
          style={[styles.mainContainer, left ? { marginLeft: 8 } : undefined]}
        >
          {children}
        </View>
        <View style={styles.rightContainer}>{right}</View>
      </View>
    );
  }
);

TopNavBarComponent.displayName = "TopNavBar";

export const TopNavBar = Object.assign(TopNavBarComponent, {
  BackButton,
  Title,
  Logo,
  IconButton: NavIconButton,
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 56,
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    marginLeft: -8,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonBg: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  backButtonIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export type { TopNavBarProps, BackButtonProps, TitleProps, LogoProps };
