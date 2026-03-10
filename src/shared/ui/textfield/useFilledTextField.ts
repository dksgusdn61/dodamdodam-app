import { useState } from "react";

export const useFilledTextField = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowValue, setIsShowValue] = useState(false);

  return { isFocused, setIsFocused, isShowValue, setIsShowValue };
};
