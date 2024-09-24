import { Movie } from "../../..";

export interface CurrentMovieState {
  currentMovie: Movie | null;
  isLoading: boolean;
  error: string;
}
