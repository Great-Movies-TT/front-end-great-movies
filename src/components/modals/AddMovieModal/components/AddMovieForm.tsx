import { Box, Button } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addServiceModal,
  removeServiceModal,
} from "@/redux/slices/serviceModalSlice/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { validationSchema } from "./validationScheme";
// import { formatISO } from "date-fns";
import { useEffect, useRef } from "react";
import { AddMovieFormView } from ".";
import { useAppDispatch } from "@/hooks";
import { addMovieRequest } from "@/redux/slices/movieSlice/movieSlice";
import { AddMovie } from "@/types";

type FormData = yup.InferType<ReturnType<typeof validationSchema>>;

interface AddMovieFormProps {
  movieId?: string;
}

export const AddMovieForm = ({ movieId }: AddMovieFormProps) => {
  // const movieData = selectMovieData();
  // const isLoading = selectMovieDataLoading();
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

  const {
    handleSubmit,
    control,
    // watch,
    // setValue,
    getValues,
    // setError,
    // clearErrors,
    // resetField,
    reset,
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(validationSchema()),
    mode: "onChange",
  });

  const initialValuesRef = useRef<FormData | null>(null);

  useEffect(() => {
    reset(defaultValues);
    // if (movieId) {
    //   dispatch(fetchEventById(movieId));
    // }
  }, [movieId, dispatch, reset]);

  // useEffect(() => {
  //   if (movieId && eventData) {
  //     (Object.keys(defaultValues) as Array<keyof FormData>).forEach((key) => {
  //       const value = eventData[key as keyof typeof eventData];
  //       if (key in eventData) {
  //         setValue(
  //           key,
  //           typeof value === "number" ? String(value) : value ?? null
  //         );
  //       }
  //     });
  //   }

  //   initialValuesRef.current = getValues();
  // }, [movieId, eventData, setValue, getValues]);

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
    // dispatch(removeServiceModal(ServiceModalName.AddMovie));
    // console.log(movie);

    // const formatedEvent = {
    //   ...movie,
    //   dateOfEvent: formatISO(movie.releaseDate),
    // };

    if (movieId) {
      // dispatch(updateEventById({ id: movieId, payload: formatedEvent }));
      dispatch(removeServiceModal(ServiceModalName.EditMovie));
    } else {
      console.log("WORKING!!!");
      
      // dispatch(removeServiceModal(ServiceModalName.AddMovie));
    }
    dispatch(addMovieRequest(movie));
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
            // disabled={isLoading}
            sx={{
              width: "50%",
              textTransform: "capitalize",
              borderRadius: "8px",
              padding: "10px 18px",
              borderColor: "palette.primary.main",
              // "&:hover": {
              //   borderColor: "border.hover",
              //   backgroundColor: "rgba(56, 65, 155, 0.10)",
              //   color: "border.hover",
              // },
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
