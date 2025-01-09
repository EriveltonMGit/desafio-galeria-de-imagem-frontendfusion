import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// Inferir o tipo do RootState a partir do store configurado
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
