import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

const ThemeConsumer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext and ThemeProvider', () => {
  it('should throw an error when useTheme is used outside ThemeProvider', () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within ThemeProvider'
    );
  });

  it('should provide light theme by default', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('should toggle theme from light to dark', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /Toggle Theme/i });
    const themeSpan = screen.getByTestId('theme');

    expect(themeSpan).toHaveTextContent('light');

    fireEvent.click(toggleButton);

    expect(themeSpan).toHaveTextContent('dark');
  });

  it('should toggle theme back from dark to light', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /Toggle Theme/i });
    const themeSpan = screen.getByTestId('theme');

    fireEvent.click(toggleButton); 
    expect(themeSpan).toHaveTextContent('dark');

    fireEvent.click(toggleButton); 
    expect(themeSpan).toHaveTextContent('light');
  });

  it('should apply correct CSS class to container', () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('app-theme');
    expect(wrapper).toHaveClass('light');

    const toggleButton = screen.getByRole('button', { name: /Toggle Theme/i });
    fireEvent.click(toggleButton);

    expect(wrapper).toHaveClass('dark');
    expect(wrapper).not.toHaveClass('light');
  });
});
