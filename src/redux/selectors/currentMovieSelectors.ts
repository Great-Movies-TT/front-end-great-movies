import { useAppSelector } from "@/hooks";
import { RootState } from "../store";

export const selectCurrentMovie = () =>
  useAppSelector((state: RootState) => state.currentMovieSlice.currentMovie);

export const selectCurrentMovieLoading = () =>
  useAppSelector((state: RootState) => state.currentMovieSlice.isLoading);
