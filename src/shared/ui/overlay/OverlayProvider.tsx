import React, { useCallback, useMemo, memo } from "react";
import { View, Pressable, StyleSheet, Modal } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { useOverlayAnimation } from "@shared/hooks";
import { OverlayContext, type OverlayElement } from "./OverlayContext";

interface OverlayControllerProps {
  id: string;
  element: OverlayElement;
  onClose: (id: string) => void;
  setDimClickHandler: (handler: () => void) => void;
}

const OverlayController = memo(
  ({ id, element, onClose, setDimClickHandler }: OverlayControllerProps) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const close = useCallback(() => {
      setIsOpen(false);
      onClose(id);
    }, [id, onClose]);

    const exit = useCallback(() => {
      onClose(id);
    }, [id, onClose]);

    return (
      <>
        {element({ isOpen, close, exit, setDimClickHandler })}
      </>
    );
  }
);

OverlayController.displayName = "OverlayController";

export const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  const {
    overlays,
    hasOverlays,
    mount,
    handleClose,
    setDimClickHandler,
    handleDimPress,
    dimAnimatedStyle,
    contentAnimatedStyle,
  } = useOverlayAnimation();

  const contextValue = useMemo(
    () => ({ mount, unmount: handleClose, setDimClickHandler }),
    [mount, handleClose, setDimClickHandler]
  );

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      {hasOverlays && (
        <Modal transparent visible animationType="none">
          <Animated.View
            style={[
              styles.dim,
              { backgroundColor: colors.overlay.dim },
              dimAnimatedStyle,
            ]}
          >
            <Pressable
              style={StyleSheet.absoluteFillObject}
              onPress={handleDimPress}
            />
          </Animated.View>
          <View style={styles.container} pointerEvents="box-none">
            <Animated.View style={contentAnimatedStyle}>
              {overlays.map(({ id, element }) => (
                <OverlayController
                  key={id}
                  id={id}
                  element={element}
                  onClose={handleClose}
                  setDimClickHandler={setDimClickHandler}
                />
              ))}
            </Animated.View>
          </View>
        </Modal>
      )}
    </OverlayContext.Provider>
  );
};

const styles = StyleSheet.create({
  dim: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
