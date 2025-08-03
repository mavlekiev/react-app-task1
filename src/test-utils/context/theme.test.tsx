import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeContext, useTheme } from '../../context/theme';
import { type ReactNode } from 'react';

const ThemeConsumer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

const TestThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

describe('Theme Context and useTheme', () => {
  it('should throw an error when useTheme is used outside of ThemeProvider', () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within ThemeProvider'
    );
  });

  it('should provide theme and toggleTheme when used inside ThemeProvider', () => {
    render(
      <TestThemeProvider>
        <ThemeConsumer />
      </TestThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(
      screen.getByRole('button', { name: /Toggle Theme/i })
    ).toBeInTheDocument();
  });

  it('should pass the correct theme value', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
        <ThemeConsumer />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should call toggleTheme when button is clicked', () => {
    const toggleThemeSpy = vi.fn();

    render(
      <ThemeContext.Provider
        value={{ theme: 'light', toggleTheme: toggleThemeSpy }}
      >
        <ThemeConsumer />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button', { name: /Toggle Theme/i });
    button.click();

    expect(toggleThemeSpy).toHaveBeenCalledTimes(1);
  });
});
