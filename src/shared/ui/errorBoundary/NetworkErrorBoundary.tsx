import React, { Component } from "react";
import { View } from "react-native";
import { toast } from "@shared/ui/toast/toastManager";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class NetworkErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    toast.error("네트워크 오류가 발생했어요", { position: "top" });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <View />;
    }
    return this.props.children;
  }
}
