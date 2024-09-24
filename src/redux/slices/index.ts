import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice/movieSlice";
import currentMovieReducer from "./currentMovieSlice/currentMovieSlice";
import serviceModalReducer from "./serviceModalSlice/serviceModalSlice";

const rootReducer = combineReducers({
  movieSlice: movieReducer,
  currentMovieSlice: currentMovieReducer,
  serviceModalSlice: serviceModalReducer,
});

export default rootReducer;
