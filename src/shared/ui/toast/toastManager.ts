import type { ReactNode } from "react";

export type ToastPosition = "top" | "bottom";
export type ToastType = "default" | "success" | "error" | "warning";

export interface ToastOptions {
  position?: ToastPosition;
  duration?: number;
  icon?: ReactNode;
  type?: ToastType;
}

export interface ToastItemData extends Required<Omit<ToastOptions, "icon">> {
  id: string;
  message: string;
  icon?: ReactNode;
}

type Listener = (toasts: ToastItemData[]) => void;

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION: ToastPosition = "bottom";

let toasts: ToastItemData[] = [];
const listeners = new Set<Listener>();

const notify = () => listeners.forEach((listener) => listener([...toasts]));
const generateId = () =>
  `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const show = (message: string, options: ToastOptions = {}): string => {
  const id = generateId();
  const toastItem: ToastItemData = {
    id,
    message,
    position: options.position ?? DEFAULT_POSITION,
    duration: options.duration ?? DEFAULT_DURATION,
    icon: options.icon,
    type: options.type ?? "default",
  };
  toasts = [...toasts, toastItem];
  notify();
  return id;
};

const hide = (id: string) => {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
};

export const toastManager = {
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  show,
  hide,
  getToasts: () => [...toasts],
};

export type ToastFunction = {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: Omit<ToastOptions, "type">) => string;
  error: (message: string, options?: Omit<ToastOptions, "type">) => string;
  warning: (message: string, options?: Omit<ToastOptions, "type">) => string;
  hide: (id: string) => void;
};

export const toast: ToastFunction = Object.assign(
  (message: string, options?: ToastOptions) => show(message, options),
  {
    success: (message: string, options?: Omit<ToastOptions, "type">) =>
      show(message, { ...options, type: "success" }),
    error: (message: string, options?: Omit<ToastOptions, "type">) =>
      show(message, { ...options, type: "error" }),
    warning: (message: string, options?: Omit<ToastOptions, "type">) =>
      show(message, { ...options, type: "warning" }),
    hide,
  }
);
