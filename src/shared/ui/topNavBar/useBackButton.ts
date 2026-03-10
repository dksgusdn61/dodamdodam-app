import { useState, useCallback } from "react";

interface UseBackButtonOptions {
  handlePressIn: () => void;
  handlePressOut: () => void;
}

export const useBackButton = ({ handlePressIn, handlePressOut }: UseBackButtonOptions) => {
  const [pressed, setPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    handlePressIn();
  }, [handlePressIn]);

  const onPressOut = useCallback(() => {
    setPressed(false);
    handlePressOut();
  }, [handlePressOut]);

  return { pressed, onPressIn, onPressOut };
};
