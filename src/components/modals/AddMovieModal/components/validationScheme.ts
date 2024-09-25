import * as yup from "yup";

export const validationSchema = () => {
  return yup.object({
    title: yup
      .string()
      .required("This field is required")
      .trim()
      .min(2, "Invalid movie name minimum 2 chars")
      .max(200, "Invalid movie name maximum 200 chars"),

    rating: yup
      .number()
      .required("This field is required")
      .min(1, "Rating must be at least 0")
      .max(10, "Rating must be at most 10"),

    releaseDate: yup.string().required("This field is required"),

    genre: yup
      .string()
      .required("This field is required")
      .trim()
      .min(2, "Invalid movie genre minimum 2 chars")
      .max(40, "Invalid movie genre maximum 40 chars"),

    director: yup
      .string()
      .required("This field is required")
      .trim()
      .min(2, "Invalid director minimum 2 chars")
      .max(40, "Invalid director maximum 40 chars"),

    description: yup
      .string()
      .required("This field is required")
      .trim()
      .min(2, "Invalid movie description minimum 2 chars")
      .max(500, "Invalid movie description maximum 500 chars"),

    actors: yup
      .array()
      .required("This field is required")
      .of(
        yup
          .string()
          .required("Actor name is required")
          .min(2, "Invalid actor name minimum 2 chars")
          .max(50, "Invalid actor name maximum 50 chars")
      )
      .min(1, "At least one actor is required"),

    imageUrl: yup
      .string()
      .url("Invalid image URL")
      .required("This field is required"),
  });
};
