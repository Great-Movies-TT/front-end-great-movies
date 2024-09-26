import {
  FormAutocompleteDropdown,
  FormDatePicker,
  FormDropdown,
  FormInputText,
} from "@/components";
import { famousActors, mockedGenres, mockedRatings } from "@/constants";
import { Box, Stack, type SxProps } from "@mui/material";
import type { AddMovie } from "@/types";
import type { Control } from "react-hook-form";

interface AddMovieFormViewProps {
  control: Control<AddMovie>;
  sx?: SxProps;
}

export const AddMovieFormView = ({ control }: AddMovieFormViewProps) => {
  return (
    <Stack
      spacing={3}
      sx={{
        maxHeight: "516px",
        overflowY: "auto",
        mb: 4,
        pr: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: "24px",
        }}
      >
        <FormInputText
          name="title"
          control={control}
          label="Movie title"
          placeholder="Enter title"
          required={true}
          sx={{ width: { sm: "100%", md: "320px" } }}
        />
        <FormDatePicker
          name="releaseDate"
          control={control}
          label="Movie release date"
          required={true}
          sx={{ width: { sm: "100%", md: "320px" } }}
        />
      </Box>
      <FormInputText
        name="imageUrl"
        control={control}
        label="Image url"
        placeholder="Enter the image url"
        required={true}
        minRows={3}
        maxRows={3}
        multiline
        sx={{ width: "100%" }}
      />
      <FormInputText
        name="director"
        control={control}
        label="Director"
        placeholder="Enter director name"
        required={true}
        multiline
        sx={{ width: "100%" }}
      />
      <FormInputText
        name="description"
        control={control}
        label="Description"
        placeholder="Enter description"
        required={true}
        multiline
        minRows={5}
        maxRows={5}
        sx={{ width: "100%" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: { xs: "column", sm: "row" },
          gap: "24px",
          width: "100%",
        }}
      >
        <FormDropdown
          name="genre"
          control={control}
          label="Genre"
          placeholder="Select genre"
          required={true}
          options={mockedGenres}
          sx={{ width: "100%" }}
        />
        <FormDropdown
          name="rating"
          control={control}
          label="Rating"
          placeholder="Select rating"
          required={true}
          options={mockedRatings}
          sx={{ width: "100%" }}
        />
      </Box>

      <FormAutocompleteDropdown
        name="actors"
        control={control}
        label="Actors"
        placeholder="Select actors"
        required={true}
        options={famousActors}
        sx={{ width: "100%" }}
      />
    </Stack>
  );
};
