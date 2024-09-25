import {
  FormAutocompleteDropdown,
  FormDatePicker,
  FormDropdown,
  FormInputText,
} from "@/components";
import { AddMovie } from "@/types";
import { Box, Stack, type SxProps } from "@mui/material";
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
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
        <FormInputText
          name="title"
          control={control}
          label="Movie title"
          placeholder="Enter title"
          required={true}
          sx={{ width: "320px" }}
        />
        <FormDatePicker
          name="releaseDate"
          control={control}
          label="Movie release date"
          disablePast={true}
          required={true}
          sx={{ width: "100%" }}
        />
      </Box>
      <FormInputText
        name="imageUrl"
        control={control}
        label="Image url"
        placeholder="Enter the image url"
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
          gap: "24px",
          minWidth: "100%",
        }}
      >
        <FormDropdown
          name="genre"
          control={control}
          label="Genre"
          placeholder="Select genre"
          required={true}
          options={["Action", "Comedy", "Drama", "Horror", "Romance"]}
          sx={{ width: "320px" }}
        />
        <FormDropdown
          name="rating"
          control={control}
          label="Rating"
          placeholder="Select rating"
          required={true}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          sx={{ width: "320px" }}
        />
      </Box>

      <FormAutocompleteDropdown
        name="actors"
        control={control}
        label="Actors"
        placeholder="Select actors"
        required={true}
        options={["Actor 1", "Actor 2", "Actor 3", "Actor 4", "Actor 5"]}
        sx={{ width: "100%" }}
      />
    </Stack>
  );
};
