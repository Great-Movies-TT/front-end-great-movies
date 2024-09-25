import { Movie } from "@/types";
import { checkWindow } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  favorites: Movie[];
}

const favoritesStorage =
  checkWindow() && JSON.parse(localStorage.getItem("favorite") || "[]");

const initialFovitesState: FavoritesState = {
  favorites: favoritesStorage,
};

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState: initialFovitesState,
  reducers: {
    addFavorite(state, { payload }: PayloadAction<Movie>) {
      if (state.favorites.some((movie) => movie.id === payload.id)) {
        state.favorites = state.favorites.filter(
          (movie) => movie.id !== payload.id
        );
      } else {
        state.favorites.push(payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, { payload }: PayloadAction<number>) {
      state.favorites = state.favorites.filter((movie) => movie.id !== payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setFavorites(state, { payload }: PayloadAction<Movie[]>) {
      state.favorites = payload;
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearFavorites(state) {
      state.favorites = [];
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, setFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
