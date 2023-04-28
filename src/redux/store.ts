import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { apiPokedex } from '../services/API/pokedexApi'

const store = configureStore({
  reducer: {...rootReducer, 
    [apiPokedex.reducerPath]: apiPokedex.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiPokedex.middleware)
  }
})

setupListeners(store.dispatch)

export { store } 