import { Card, Dropdown } from "@/components";
import { Box, Button, Pagination, SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFavorites } from "@/redux/slices/favoritesSlice/favoritesSlice";
import theme from "@/styles/muiTheme";
import { addServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { useSearchParams } from "react-router-dom";
import {
  getMoviesRequest,
  getTotalCountRequest,
} from "@/redux/slices/movieSlice/movieSlice";
import {
  selectMovies,
  selectMoviesTotalCount,
} from "@/redux/selectors/movieSelectors";
import { Movie } from "@/types";
import { mockedGenres, mockedRatings } from "@/constants";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movies: Movie[] = selectMovies();
  const totalCount = selectMoviesTotalCount();
  const itemsPerPage = 8;

  const currentPage = Number(searchParams.get("page")) || 1;
  const sortByGenre = searchParams.get("genre") || "";
  const sortByRating = searchParams.get("minRating")
    ? Number(searchParams.get("minRating"))
    : null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalCountRequest());
    dispatch(
      getMoviesRequest({
        page: currentPage,
        limit: itemsPerPage,
        genre: sortByGenre,
        minRating: sortByRating,
      })
    );
  }, [currentPage, itemsPerPage, sortByGenre, sortByRating]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (storedFavorites.length > 0) {
      dispatch(setFavorites(storedFavorites));
    }
  }, [dispatch]);

  useEffect(() => {
    const query: { [key: string]: string } = {};
    if (sortByGenre) query.genre = sortByGenre;
    if (sortByRating) query.minRating = String(sortByRating);
    if (currentPage) query.page = String(currentPage);

    setSearchParams(query);
  }, [sortByGenre, sortByRating, currentPage, setSearchParams]);

  const addMovieHandler = () => {
    dispatch(
      addServiceModal({
        type: ServiceModalName.AddMovie,
      })
    );
  };

  const handleSortByGenre = (event: SelectChangeEvent<string>) => {
    searchParams.set("genre", event.target.value);
    setSearchParams(searchParams);
  };

  const handleSortByRating = (event: SelectChangeEvent<string>) => {
    searchParams.set("minRating", event.target.value);
    setSearchParams(searchParams);
  };

  const handleClear = () => {
    searchParams.delete("genre");
    searchParams.delete("minRating");
    setSearchParams(searchParams);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchParams.set("page", value.toString());
    setSearchParams(searchParams);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ width: "100%" }}>
              <Dropdown
                name="sortByGenre"
                label="Genre"
                placeholder="Sort by genre"
                value={sortByGenre}
                options={mockedGenres}
                onChange={handleSortByGenre}
                sx={{ minWidth: "200px" }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ width: "100%" }}>
              <Dropdown
                name="sortByRating"
                label="Min rating"
                placeholder="Select rating"
                value={sortByRating !== null ? String(sortByRating) : ""}
                options={mockedRatings}
                onChange={handleSortByRating}
                sx={{ minWidth: "200px" }}
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 12, md: 4 }}
              sx={{
                display: "flex",
                alignSelf: "flex-end",
                width: "100%",
                md: { justifyContent: "center" },
              }}
            >
              <Button
                onClick={handleClear}
                sx={{
                  textTransform: "none",
                  color: theme.palette.common.white,
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transition: "color 0.3s ease",
                  },
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 2, lg: 2 }}
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            variant="contained"
            onClick={addMovieHandler}
            sx={{ textTransform: "none", width: "100%" }}
          >
            + Add
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mb: 8, flexGrow: 1 }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid
              key={movie._id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card movie={movie} />
            </Grid>
          ))
        ) : (
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <p>No movies found</p>
          </Grid>
        )}
      </Grid>

      <Grid container sx={{ width: "100%", alignSelf: "flex-end" }}>
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
