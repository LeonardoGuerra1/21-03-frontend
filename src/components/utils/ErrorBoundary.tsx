import React, { PropsWithChildren } from "react";

interface State {
  hasError: boolean,
}

export class ErrorBoundary extends React.Component<PropsWithChildren<{ fallback: React.ReactNode }>, State> {

  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

