import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice/movieSlice";
import currentMovieReducer from "./currentMovieSlice/currentMovieSlice";

const rootReducer = combineReducers({
  movieSlice: movieReducer,
  currentMovieSlice: currentMovieReducer,
});

export default rootReducer;
