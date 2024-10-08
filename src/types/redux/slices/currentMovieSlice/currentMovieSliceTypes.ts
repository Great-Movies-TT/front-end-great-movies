import type { Movie } from "@/types";

export interface CurrentMovieState {
  currentMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
}
