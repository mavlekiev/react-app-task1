import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Component, type ReactNode } from 'react';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';

const consoleError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});
afterAll(() => {
  console.error = consoleError;
});

class ErrorComponent extends Component {
  render(): ReactNode {
    throw new Error('Test error');
    return null;
  }
}

describe('ErrorBoundary Component', () => {
  it('catches error and renders fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
  });

  it('renders children if no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });
});
