import type { ReactNode } from 'react';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../../utils/interfaces';
import { Component } from 'react';

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

  componentDidCatch(error: Error) {
    console.error('Error', error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please reload the page.</h2>;
    }

    return this.props.children;
  }
}
