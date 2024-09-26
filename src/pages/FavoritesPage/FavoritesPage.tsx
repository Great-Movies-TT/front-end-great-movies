import { Card } from "@/components";
import { selectFavotires } from "@/redux/selectors/favoriteSelectors";
import { Box, Grid2, Typography } from "@mui/material";
import theme from "@/styles/muiTheme";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { setFavorites } from "@/redux/slices/favoritesSlice/favoritesSlice";

function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = selectFavotires();

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (storedFavorites.length > 0) {
      dispatch(setFavorites(storedFavorites));
    }
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Typography
        variant="h3"
        sx={{ color: theme.palette.common.white, mb: 4 }}
      >
        Your favorite movies
      </Typography>
      <Grid2 container spacing={4} sx={{ mb: 8, flexGrow: 1 }}>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Grid2
              key={movie._id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card movie={movie} />
            </Grid2>
          ))
        ) : (
          <Grid2
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <p>No favorites found</p>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
}

export default FavoritesPage;
