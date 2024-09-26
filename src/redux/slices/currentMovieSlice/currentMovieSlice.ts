import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialCurrentMovieState } from "./initialCurrentMovieState";
import { Movie } from "@/types";

const currentMovieSlice = createSlice({
  name: "currentMovieSlice",
  initialState: initialCurrentMovieState,
  reducers: {
    getCurrentMovieRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    getCurrentMovieSuccess: (state, action: PayloadAction<Movie | null>) => {
      state.currentMovie = action.payload;
      state.isLoading = false;
    },
    getCurrentMovieFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removecurrentMovie: (state) => {
      state.currentMovie = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  getCurrentMovieRequest,
  getCurrentMovieSuccess,
  getCurrentMovieFailure,
  removecurrentMovie,
} = currentMovieSlice.actions;

export default currentMovieSlice.reducer;
