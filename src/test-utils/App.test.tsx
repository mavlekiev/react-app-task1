import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store/store';
import App from '../App';

const renderWithProviders = (initialEntries = ['/']) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </MemoryRouter>
  );
};

describe('App Component', () => {
  it('renders MainPage on /', () => {
    renderWithProviders(['/']);
    expect(screen.getByText(/Search Pokémon/i)).toBeInTheDocument();
  });

  it('renders About on /about', () => {
    renderWithProviders(['/about']);
    expect(screen.getByText(/About Pokémon Search App/i)).toBeInTheDocument();
  });

  it('renders NotFound on unknown route', () => {
    renderWithProviders(['/unknown']);
    expect(screen.getByText(/404 — Page not found/i)).toBeInTheDocument();
  });
});