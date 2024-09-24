import { Box, Button, Paper, Typography } from "@mui/material";
import theme from "@/styles/muiTheme";
import { Link } from "react-router-dom";
import { Movie } from "@/types";
import { truncate } from "@/utils";

interface CardProps {
  movie: Movie;
}

export const Card = ({ movie }: CardProps) => {
  return (
    <Paper
      elevation={5}
      sx={{
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
        component={Link}
        to={`/movies/${movie.id}`}
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <Box
          component="img"
          src={String(movie.imageUrl)}
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
            src="../src/assets/star.png"
            sx={{ width: "20px", height: "20px", mr: 1 }}
          />
          <Typography sx={{ fontWeight: "bold" }}>{movie.rating}</Typography>
        </Box>
        <Typography
          component={Link}
          to={`/movies/${movie.id}`}
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
        onClick={() => {}}
        sx={{
          backgroundColor: theme.palette.info.main,
          color: theme.palette.common.black,
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transition: "all 0.3s ease",
            backgroundColor: theme.palette.info.dark,
          },
        }}
      >
        Add to favorites
      </Button>
    </Paper>
  );
};
