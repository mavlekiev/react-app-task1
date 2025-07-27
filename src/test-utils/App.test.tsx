import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

vi.stubGlobal('fetch', vi.fn());

describe('App Component (Routing)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders MainPage on root route', async () => {
    (global.fetch as Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'bulbasaur',
          types: [{ type: { name: 'grass' } }],
          weight: 69,
          base_experience: 64,
          abilities: [{ ability: { name: 'overgrow' } }],
        }),
      });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const bulbasaur = await screen.findByText(/bulbasaur/i);
    expect(bulbasaur).toBeInTheDocument();
  });

  it('renders About page on /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('About Pokémon Search App')).toBeInTheDocument();
    expect(screen.getByText('Application Details')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  it('renders NotFound page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('404 — Page not found')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, the page you requested does not exist.')
    ).toBeInTheDocument();
  });
});
