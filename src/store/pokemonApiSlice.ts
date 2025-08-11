import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonDetails } from '../utils/interfaces';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      PokemonListResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => `pokemon?limit=${limit}&offset=${offset}`,
    }),
    getPokemonByName: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
    }),

    getPokemonDetails: builder.query<PokemonDetails[], string[]>({
      queryFn: async (names, _api, _extraOptions, baseQuery) => {
        const result = await Promise.all(
          names.map((name) => baseQuery(`pokemon/${name}`))
        );
        const data = result
          .filter((res) => res.data)
          .map((res) => res.data) as PokemonDetails[];
        return { data };
      },
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useGetPokemonDetailsQuery,
} = pokemonApi;
