import type { ErrorInfo, ReactNode } from "react";
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "../../interfaces/interfaces";
import { Component } from "react";
import "./ErrorBoundary.scss";

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>
            Something went wrong. Please reload the page or click on button Back
          </h2>
          <button
            className="error__button"
            onClick={() => this.setState({ hasError: false })}
          >
            Back
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
