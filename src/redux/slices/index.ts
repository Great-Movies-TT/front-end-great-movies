import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice/movieSlice";
import currentMovieReducer from "./currentMovieSlice/currentMovieSlice";
import serviceModalReducer from "./serviceModalSlice/serviceModalSlice";
import favoritesReducer from "./favoritesSlice/favoritesSlice";

const rootReducer = combineReducers({
  movieSlice: movieReducer,
  currentMovieSlice: currentMovieReducer,
  serviceModalSlice: serviceModalReducer,
  favoritesSlice: favoritesReducer,
});

export default rootReducer;
