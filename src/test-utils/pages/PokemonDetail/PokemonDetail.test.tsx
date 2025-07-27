import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, type Mock } from 'vitest';
import PokemonDetail from '../../../pages/PokemonDetail/PokemonDetail';

vi.stubGlobal('fetch', vi.fn());

describe('PokemonDetail Component', () => {
  const mockPokemon = {
    name: 'pikachu',
    id: 25,
    weight: 60,
    base_experience: 112,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    types: [{ type: { name: 'electric' } }],
    abilities: [
      { ability: { name: 'static' } },
      { ability: { name: 'lightning-rod' } },
    ],
  };

  it('displays loading state initially', () => {
    render(<PokemonDetail name="pikachu" />);

    expect(screen.getByText('Loading details...')).toBeInTheDocument();
  });

  it('fetches and displays pokemon data', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    });

    render(<PokemonDetail name="pikachu" />);

    expect(screen.getByText('Loading details...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(screen.getByText('Weight: 6 kg')).toBeInTheDocument();
    expect(screen.getByText('Experience: 112 XP')).toBeInTheDocument();
    expect(screen.getByText('Types: electric')).toBeInTheDocument();
    expect(
      screen.getByText('Abilities: static, lightning-rod')
    ).toBeInTheDocument();

    const img = screen.getByAltText('pikachu');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockPokemon.sprites.front_default);
  });

  it('displays "Pokémon not found" on fetch error', async () => {
    (global.fetch as Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<PokemonDetail name="unknown" />);

    expect(screen.getByText('Loading details...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Pokémon not found')).toBeInTheDocument();
    });
  });

  it('displays "Pokémon not found" on 404 response', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<PokemonDetail name="unknown" />);

    await waitFor(() => {
      expect(screen.getByText('Pokémon not found')).toBeInTheDocument();
    });
  });

  it('does not fetch if name is empty', () => {
    (global.fetch as Mock).mockClear();

    render(<PokemonDetail name="" />);
    expect(screen.getByText('Loading details...')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
});
