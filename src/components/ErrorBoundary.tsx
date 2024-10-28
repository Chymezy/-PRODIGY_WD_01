import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { accessibleColors } from '../utils/accessibilityUtils';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className={`text-2xl font-bold mb-4 ${accessibleColors.text.primary.light} ${accessibleColors.text.primary.dark}`}>
            Something went wrong
          </h2>
          <p className={`${accessibleColors.text.secondary.light} ${accessibleColors.text.secondary.dark}`}>
            Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
