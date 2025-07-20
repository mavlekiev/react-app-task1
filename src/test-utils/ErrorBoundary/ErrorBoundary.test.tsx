import { Component, type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import App from '../../components/App';

class TestComponent extends Component {
  render(): ReactNode {
    throw new Error('Test error');
    return null;
  }
}

describe('ErrorBoundary Component', () => {
  test('shows fallback UI when child throws error', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  test('logs error to console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  test('resets error when Back button is clicked and shows App', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    const errorButton = await screen.findByRole('button', {
      name: /raise an error/i,
    });
    fireEvent.click(errorButton);

    await screen.findByText(/something went wrong/i);

    const button = screen.getByRole('button', { name: /back/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.queryByText(/something went wrong/i)
      ).not.toBeInTheDocument();
      expect(screen.getByText(/search pokemon/i)).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });
});
