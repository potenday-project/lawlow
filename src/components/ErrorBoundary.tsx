/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import { Component, ReactNode } from "react";

import { AxiosError } from "axios";

import {
  CustomError,
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "@/interface/error";

interface Props extends ErrorBoundaryProps {
  children: ReactNode;
}
class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error | AxiosError) {
    return { error, shouldRethrow: false, shouldShowFallbackUI: true };
  }

  resetErrorBoundary() {
    this.setState({
      error: null,
    });
  }

  render() {
    const { fallbackComponent: FallbackComponent, children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <FallbackComponent
          error={
            error !== null && !("name" in error)
              ? ({ name: "Error" } as CustomError)
              : error
          }
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
