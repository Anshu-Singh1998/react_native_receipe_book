// src/redux/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const existingItem = state.find(recipe => recipe.idMeal === action.payload.idMeal);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFavorite: (state, action) => {
      const existingItem = state.find(recipe => recipe.idMeal === action.payload);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        return state.filter(recipe => recipe.idMeal !== action.payload);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
