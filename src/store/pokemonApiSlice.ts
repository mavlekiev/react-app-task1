import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
}

export interface PokemonDetail {
  name: string;
  id: number;
  weight: number;
  base_experience: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  sprites: {
    front_default: string;
  };
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
    getPokemonByName: builder.query<PokemonDetail, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
    }),

    getPokemonDetails: builder.query<PokemonDetail[], string[]>({
      queryFn: async (names, api, extraOptions, baseQuery) => {
        const result = await Promise.all(
          names.map((name) => baseQuery(`pokemon/${name}`))
        );
        const data = result
          .filter((res) => res.data)
          .map((res) => res.data) as PokemonDetail[];
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
