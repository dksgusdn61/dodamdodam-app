import { useState, useEffect } from "react";
import { toastManager, type ToastItemData } from "./toastManager";

export const useToasts = () => {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);

  const topToasts = toasts.filter((t) => t.position === "top");
  const bottomToasts = toasts.filter((t) => t.position === "bottom");

  return { topToasts, bottomToasts };
};
