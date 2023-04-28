import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiPokedex = createApi({
  reducerPath: 'apiPokedex',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonByIdOrName: builder.query({
      query: (idOrName) => `pokemon/${idOrName}`,
    }),
  }),
});

export const { useGetPokemonByIdOrNameQuery, useLazyGetPokemonByIdOrNameQuery } = apiPokedex;
