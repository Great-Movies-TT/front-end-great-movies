import { createSlice } from "@reduxjs/toolkit";
import { initialMovieState } from "./initialMovieState";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AddMovie,
  Movie,
  MovieSeachPayload,
  TotalCountPayload,
  UpdateMovie,
} from "@/types";

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
    updateMovieRequest: (
      state,
      _action: PayloadAction<{ movieId: string; movie: UpdateMovie }>
    ) => {
      state.isLoading = true;
    },
    updateMovieSuccess: (state) => {
      state.isLoading = false;
    },
    updateMovieFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteMovieRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    deleteMovieSuccess: (state) => {
      state.isLoading = false;
    },
    deleteMovieFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTotalCountRequest: (
      _state,
      _action: PayloadAction<TotalCountPayload>
    ) => {},
    getTotalCountSuccess: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    addMovieRequest: (_state, _action: PayloadAction<AddMovie>) => {},
    addMovieSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    addMovieFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
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
  addMovieFailure,
} = movieSlice.actions;

export default movieSlice.reducer;
