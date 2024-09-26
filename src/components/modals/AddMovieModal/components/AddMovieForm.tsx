import { Box, Button } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addServiceModal,
  removeServiceModal,
} from "@/redux/slices/serviceModalSlice/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { validationSchema } from "./validationScheme";
import { useEffect, useRef } from "react";
import { AddMovieFormView } from ".";
import { useAppDispatch } from "@/hooks";
import {
  addMovieRequest,
  updateMovieRequest,
} from "@/redux/slices/movieSlice/movieSlice";
import type { SubmitHandler } from "react-hook-form";
import type { AddMovie } from "@/types";
import {
  selectCurrentMovie,
  selectCurrentMovieLoading,
} from "@/redux/selectors/currentMovieSelectors";
import { getCurrentMovieRequest } from "@/redux/slices/currentMovieSlice/currentMovieSlice";

type FormData = yup.InferType<ReturnType<typeof validationSchema>>;

interface AddMovieFormProps {
  movieId?: string;
}

export const AddMovieForm = ({ movieId }: AddMovieFormProps) => {
  const movieData = selectCurrentMovie();
  const isLoading = selectCurrentMovieLoading();
  const dispatch = useAppDispatch();

  const defaultValues: FormData = {
    title: "",
    description: "",
    actors: [],
    genre: "",
    director: "",
    rating: 1,
    releaseDate: "",
    imageUrl: "",
  };

  const { handleSubmit, control, setValue, getValues, reset } =
    useForm<FormData>({
      defaultValues,
      resolver: yupResolver(validationSchema()),
      mode: "onChange",
    });

  const initialValuesRef = useRef<FormData | null>(null);

  useEffect(() => {
    reset(defaultValues);
    if (movieId) {
      dispatch(getCurrentMovieRequest(movieId));
    }
  }, [movieId, dispatch, reset]);

  useEffect(() => {
    if (movieId && movieData) {
      (Object.keys(defaultValues) as Array<keyof FormData>).forEach((key) => {
        const value = movieData[key as keyof typeof movieData];
        if (key in movieData) {
          setValue(
            key,
            typeof value === "number" ? String(value) : value ?? null
          );
        }
      });
    }

    initialValuesRef.current = getValues();
  }, [movieId, movieData, setValue, getValues]);

  const { isDirty, isValid } = useFormState({ control });

  const handleOnCancel = () => {
    const currentValues = getValues();

    const hasChanges = Object.keys(currentValues).some((key) => {
      return (
        currentValues[key as keyof FormData] !==
        initialValuesRef.current?.[key as keyof FormData]
      );
    });

    if (hasChanges) {
      dispatch(
        addServiceModal({
          type: ServiceModalName.AddMovieLeave,
        })
      );
    } else {
      dispatch(
        removeServiceModal(
          movieId ? ServiceModalName.EditMovie : ServiceModalName.AddMovie
        )
      );
    }
  };

  const handleFormSubmit: SubmitHandler<FormData> = (movie: AddMovie) => {
    if (movieId) {
      dispatch(updateMovieRequest({ movieId, movie }));
    } else {
      dispatch(addMovieRequest(movie));
    }
  };

  return (
    <Box sx={{ backgroundColor: "rgba(80, 95, 111, 1)" }}>
      <Box>
        <AddMovieFormView control={control} />

        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: "24px" }}
        >
          <Button
            onClick={handleOnCancel}
            type="button"
            variant="outlined"
            color="primary"
            disabled={isLoading}
            sx={{
              width: "50%",
              textTransform: "capitalize",
              borderRadius: "8px",
              padding: "10px 18px",
              borderColor: "palette.primary.main",
              "&:disabled": {
                borderColor: "action.disabled",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={!isValid || !isDirty}
            sx={{
              width: "50%",
              textTransform: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              "&:hover": {
                backgroundColor: "custom.buttonContainedHover",
              },
              "&:disabled": {
                color: "common.white",
                backgroundColor: "action.disabled",
              },
            }}
          >
            {movieId ? "Save" : "Add"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
