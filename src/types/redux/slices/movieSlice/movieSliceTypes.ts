import { Movie } from "../../..";

export interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string;
}
