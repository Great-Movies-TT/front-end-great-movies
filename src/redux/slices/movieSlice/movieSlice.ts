import { createSlice } from "@reduxjs/toolkit";
import { initialMovieState } from "./initialMovieState";

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: initialMovieState,
  reducers: {},
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
