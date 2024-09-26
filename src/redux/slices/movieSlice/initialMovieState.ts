import type { MovieState } from "@/types";

export const initialMovieState: MovieState = {
  movies: [],
  totalCount: 0,
  isLoading: false,
  error: "",
};
