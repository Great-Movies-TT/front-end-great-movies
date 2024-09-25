import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";

export const selectMovies = () =>
  useAppSelector((state: RootState) => state.movieSlice.movies);

export const selectMoviesLoading = () => {
  return useAppSelector((state: RootState) => state.movieSlice.isLoading);
};

export const selectMoviesTotalCount = () => {
  return useAppSelector((state: RootState) => state.movieSlice.totalCount);
};
