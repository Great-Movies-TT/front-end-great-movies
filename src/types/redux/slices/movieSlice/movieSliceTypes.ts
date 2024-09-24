import { Movie } from "@//types";

export interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string;
}
