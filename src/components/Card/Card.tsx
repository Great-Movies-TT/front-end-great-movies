import { Box, Button, Paper, Typography } from "@mui/material";
import theme from "@/styles/muiTheme";
import { Link, useSearchParams } from "react-router-dom";
import { Movie } from "@/types";
import { truncate } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addFavorite } from "@/redux/slices/favoritesSlice/favoritesSlice";
import { deleteMovieRequest } from "@/redux/slices/movieSlice/movieSlice";
import { addServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import star from "@/assets/star.png";

interface CardProps {
  movie: Movie;
}

export const Card = ({ movie }: CardProps) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const favorites = useAppSelector((state) => state.favoritesSlice.favorites);
  const isAdded = favorites.some((favorite) => favorite._id === movie._id);

  const handleAddToFavorites = () => {
    dispatch(addFavorite(movie));
  };

  const handleDeleteMovie = () => {
    dispatch(deleteMovieRequest(movie._id));

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("genre");
    newSearchParams.delete("minRating");

    setSearchParams(newSearchParams);
  };

  const handleEditMovie = () => {
    dispatch(
      addServiceModal({
        type: ServiceModalName.EditMovie,
        payload: {
          movieId: movie._id,
        },
      })
    );
  };

  return (
    <Paper
      elevation={5}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "10px",
        width: "250px",
        height: "490px",
        backgroundColor: "rgba(80, 95, 111, 1)",
      }}
    >
      <Box
        component={Button}
        onClick={handleDeleteMovie}
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          pl: 2.5,
          top: "20px",
          right: 0,
          width: "80px",
          height: "30px",
          zIndex: 1,
          backgroundColor: theme.palette.error.main,
          borderRadius: "8px",
          textTransform: "none",
          color: theme.palette.common.white,
          transform: "translateX(70%)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateX(5%)",
            opacity: 0.7,
            transition: "all 0.3s ease",
          },
        }}
      >
        Delete
      </Box>
      <Box
        component={Button}
        onClick={handleEditMovie}
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          pl: 2.5,
          top: "70px",
          right: 0,
          width: "80px",
          height: "30px",
          zIndex: 1,
          backgroundColor: theme.palette.primary.main,
          borderRadius: "8px",
          textTransform: "none",
          color: theme.palette.common.white,
          transform: "translateX(70%)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateX(5%)",
            opacity: 0.7,
            transition: "all 0.3s ease",
          },
        }}
      >
        Edit
      </Box>
      <Box
        component={Link}
        to={`/movies/${movie._id}`}
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <Box
          component="img"
          src={movie.imageUrl}
          sx={{
            display: "block",
            height: "300px",
            objectFit: "fill",
            transition: "transform 0.3s ease",
            "&:hover": {
              transition: "transform 0.3s ease",
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          py: 2,
          px: 1,
          gap: 1,
          color: theme.palette.common.white,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            component="img"
            src={star}
            sx={{ width: "20px", height: "20px", mr: 1 }}
          />
          <Typography sx={{ fontWeight: "bold" }}>{movie.rating}</Typography>
        </Box>
        <Typography
          component={Link}
          to={`/movies/${movie._id}`}
          variant="h6"
          sx={{
            color: theme.palette.common.white,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {truncate(movie.title, 20)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
          }}
        >
          {truncate(movie.description, 120)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={handleAddToFavorites}
        sx={{
          backgroundColor: isAdded
            ? theme.palette.primary.main
            : theme.palette.info.main,
          color: theme.palette.common.black,
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transition: "all 0.3s ease",
            backgroundColor: theme.palette.info.dark,
          },
        }}
      >
        {isAdded ? "Added" : "Add to favorites"}
      </Button>
    </Paper>
  );
};
