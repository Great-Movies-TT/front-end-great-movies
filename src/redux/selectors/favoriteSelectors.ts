import { useAppSelector } from "@/hooks";
import { RootState } from "../store";

export const selectFavotires = () =>
  useAppSelector((state: RootState) => state.favoritesSlice.favorites);
