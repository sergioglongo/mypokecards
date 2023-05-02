import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiPokedex = createApi({
  reducerPath: 'apiPokedex',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonByIdOrName: builder.query({
      query: (idOrName) => `pokemon/${idOrName}`,
      transformResponse: (response) => {
        return {
          id: response.id,
          name: response.name,
          image: response?.sprites?.other?.["official-artwork"]?.front_default,
          types: response?.types?.map((type) => type.type.name),
          weight: response?.weight,
          height: response?.height,
        }
      }
    }),
    getPokemonLimit: builder.query({
      query: ({limit, offset}) => `pokemon?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const { 
  useGetPokemonByIdOrNameQuery, 
  useLazyGetPokemonByIdOrNameQuery,
  useGetPokemonLimitQuery,
  useLazyGetPokemonLimitQuery
} = apiPokedex;
