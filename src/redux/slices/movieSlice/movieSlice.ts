import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialMovieState } from "./initialMovieState";
import { AddMovie, Movie, MovieSeachPayload } from "@/types";

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: initialMovieState,
  reducers: {
    sendInitialDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getMoviesRequest: (state, _action: PayloadAction<MovieSeachPayload>) => {
      state.isLoading = true;
    },
    getMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.isLoading = false;
    },
    getMoviesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMovieRequest: (state) => {
      state.isLoading = true;
    },
    updateMovieSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.isLoading = false;
    },
    updateMovieFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteMovieRequest: (state, _action: PayloadAction<number>) => {
      state.isLoading = true;
    },
    deleteMovieSuccess: (state) => {
      state.isLoading = false;
    },
    deleteMovieFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTotalCountRequest: () => {},
    getTotalCountSuccess: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    addMovieRequest: (_state, _action: PayloadAction<AddMovie>) => {},
    addMovieSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  getMoviesRequest,
  getMoviesSuccess,
  getMoviesFailure,
  updateMovieRequest,
  updateMovieSuccess,
  updateMovieFailure,
  deleteMovieRequest,
  deleteMovieSuccess,
  deleteMovieFailure,
  getTotalCountRequest,
  getTotalCountSuccess,
  addMovieRequest,
  addMovieSuccess,
  sendInitialDataRequest,
} = movieSlice.actions;

export default movieSlice.reducer;
