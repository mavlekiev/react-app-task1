import { useState } from 'react';
import { ThemeContext } from '../context/theme';
import type { ReactNode } from 'react';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-theme ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
