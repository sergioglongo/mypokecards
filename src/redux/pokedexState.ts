// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config

export const pokedexSlice = createSlice({
  name: 'pokedexState',
  initialState: {
    pokemon: null,
  },
  reducers: {
    setPokemonSlected: (state, action) => {
      state.pokemon = action.payload.token
    },
  }
})

export const { setPokemonSlected } = pokedexSlice.actions

export default pokedexSlice.reducer 