import type { ReactNode } from 'react';

export interface PokemonDetailProps {
  name: string;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonData {
  name: string;
  types: PokemonType[];
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
}

export interface CardProps {
  name: string;
  description: string;
}

export interface CardListProps {
  items: Array<{ name: string; description: string }>;
  onCardClick: (name: string) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface SearchProps {
  onSearch: (term: string) => void;
  disabled?: boolean;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonSprites {
  front_default: string | undefined;
}

export interface PokemonDetails {
  name: string;
  types: PokemonType[];
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}

export interface AppState {
  results: Array<{ name: string; description: string }>;
  loading: boolean;
  error: string | null;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}
