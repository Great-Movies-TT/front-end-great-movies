import type { CurrentMovieState } from "@/types";

export const initialCurrentMovieState: CurrentMovieState = {
  currentMovie: null,
  isLoading: false,
  error: null,
};
