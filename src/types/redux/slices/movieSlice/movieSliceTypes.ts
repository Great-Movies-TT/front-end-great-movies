import type { Movie } from "@/types";

export interface MovieState {
  movies: Movie[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}
