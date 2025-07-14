import type { ReactNode } from 'react';

export interface CardProps {
  name: string;
  description: string;
}

export interface CardListProps {
  items: Array<{ name: string; description: string }>;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface SearchProps {
  onSearch: (term: string) => void;
}

export interface SearchState {
  searchTerm: string;
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

export interface PokemonDetails {
  name: string;
  types: PokemonType[];
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
}

export interface AppState {
  results: Array<{ name: string; description: string }>;
  loading: boolean;
  error: string | null;
  throwErrorInRender: boolean;
}
