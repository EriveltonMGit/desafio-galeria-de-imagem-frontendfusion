import { createSlice } from '@reduxjs/toolkit';

// Função para carregar favoritos do localStorage
const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState = {
  favorites: loadFavoritesFromLocalStorage(), // Carrega os favoritos do localStorage
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); // Salva no localStorage
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); // Atualiza no localStorage
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
