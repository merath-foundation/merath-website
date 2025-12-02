import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    globalThis.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-8 bg-white">
          <div className="max-w-[600px] text-center">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">
              Something went wrong
            </h1>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              We apologize for the inconvenience. An unexpected error has occurred.
              Please try refreshing the page or return to the homepage.
            </p>
            {this.state.error && (
              <details className="mb-8 text-left">
                <summary className="cursor-pointer text-sm text-neutral-500 mb-2">
                  Technical details
                </summary>
                <pre className="text-xs bg-neutral-100 p-4 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => globalThis.location.reload()}
                variant="outline"
              >
                Refresh Page
              </Button>
              <Button onClick={this.handleReset}>
                Return Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
