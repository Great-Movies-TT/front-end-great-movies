import { useAppDispatch } from "@/hooks";
import { selectCurrentMovie } from "@/redux/selectors/currentMovieSelectors";
import { getCurrentMovieRequest } from "@/redux/slices/currentMovieSlice/currentMovieSlice";
import { Box, Grid2, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import theme from "@/styles/muiTheme";
import { format } from "date-fns";

function MovieDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = selectCurrentMovie();

  useEffect(() => {
    if (id) {
      dispatch(getCurrentMovieRequest(id));
    }
  }, [id]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Typography
        variant="h3"
        sx={{ color: theme.palette.common.white, mb: 4 }}
      >
        {movie?.title}
      </Typography>
      <Grid2
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mb: 6,
        }}
      >
        <Grid2
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={movie?.imageUrl}
            alt="movie image"
            sx={{
              display: "block",
              maxHeight: "400px",
              maxWidth: "400px",
              objectFit: "fill",
              transition: "transform 0.3s ease, border-radius 0.3s ease",
              borderRadius: "8px",

              "&:hover": {
                transition: "transform 0.3s ease, border-radius 0.3s ease",
                transform: "scale(1.1)",
              },
            }}
          />
        </Grid2>
        <Grid2
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Grid2 sx={{ width: "30%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.common.black,
                mb: 2,
              }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Rating:
              </Box>
              <Box
                component="img"
                src="../src/assets/star.png"
                sx={{ width: "20px", height: "20px", mr: 0.5 }}
              />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {movie?.rating}
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Description:
              </Box>
              {movie?.description}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Actors:
              </Box>
              {movie?.actors.join(", ")}
            </Typography>
          </Grid2>

          <Grid2 sx={{ width: "30%" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Director:
              </Box>
              {movie?.director}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Genre:
              </Box>
              {movie?.genre}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Release date:
              </Box>
              {movie?.releaseDate
                ? format(new Date(movie.releaseDate), "dd/MM/yyyy")
                : "Unknown"}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default MovieDetailsPage;
