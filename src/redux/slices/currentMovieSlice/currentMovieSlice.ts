import { createSlice } from "@reduxjs/toolkit";
import { initialCurrentMovieState } from "./initialCurrentMovieState";

const currentMovieSlice = createSlice({
  name: "currentMovieSlice",
  initialState: initialCurrentMovieState,
  reducers: {},
});

export const {} = currentMovieSlice.actions;

export default currentMovieSlice.reducer;
