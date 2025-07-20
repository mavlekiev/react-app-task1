import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import App from '../components/App';

const mockFetch = (response: object): void => {
  global.fetch = vi.fn(() =>
    Promise.resolve(response)
  ) as unknown as typeof fetch;
};

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('makes initial API call on mount and shows results', async () => {
    const mockPokemonList = {
      ok: true,
      json: async () => ({
        results: [
          { name: 'Bulbasaur', url: ' https://pokeapi.co/api/v2/pokemon/1 ' },
        ],
      }),
    };

    const mockPokemonDetails = {
      ok: true,
      json: async () => ({
        name: 'Bulbasaur',
        types: [{ type: { name: 'grass' } }],
        weight: 69,
        base_experience: 64,
        abilities: [{ ability: { name: 'overgrow' } }],
      }),
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(mockPokemonList)
      .mockResolvedValueOnce(mockPokemonDetails);

    render(<App />);

    const bulbasaurElement = await screen.findByText(/Bulbasaur/i);
    expect(bulbasaurElement).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('uses localStorage value on initial load', async () => {
    localStorage.setItem('searchTerm', 'pikachu');

    mockFetch({
      ok: true,
      json: async () => ({
        name: 'Pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25 ',
        types: [{ type: { name: 'electric' } }],
        weight: 60,
        base_experience: 112,
        abilities: [
          { ability: { name: 'static' } },
          { ability: { name: 'lightning-rod' } },
        ],
      }),
    });

    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('displays error when API fails', async () => {
    mockFetch({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument()
    );
  });

  test('shows loading state', async () => {
    global.fetch = vi.fn(
      () => new Promise(() => {})
    ) as unknown as typeof fetch;

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
