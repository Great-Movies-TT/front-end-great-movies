import { Card, Dropdown } from "@/components";
import { Box, Button, Pagination, SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { mockedMovies } from "@/constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFavorites } from "@/redux/slices/favoritesSlice/favoritesSlice";
import theme from "@/styles/muiTheme";
import { addServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortByGenre, setSortByGenre] = useState("");
  const [sortByRating, setSortByRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalMovies, setTotalMovies] = useState(0);

  const itemsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (storedFavorites.length > 0) {
      dispatch(setFavorites(storedFavorites));
    }
  }, [dispatch]);

  useEffect(() => {
    const querySortByGenre = searchParams.get("genre");
    const querySortByRating = searchParams.get("minRating");
    const queryPage = searchParams.get("page");

    if (querySortByGenre) setSortByGenre(querySortByGenre);
    if (querySortByRating)
      setSortByRating(querySortByRating ? Number(querySortByRating) : null);
    if (queryPage) setCurrentPage(Number(queryPage));
  }, [searchParams]);

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
    setSortByGenre(event.target.value);
  };

  const handleSortByRating = (event: SelectChangeEvent<string>) => {
    setSortByRating(Number(event.target.value));
  };

  const handleClear = () => {
    setSortByGenre("");
    setSortByRating(null);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(mockedMovies.length / itemsPerPage);

  return (
    <Box>
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
                options={[
                  "Action",
                  "Comedy",
                  "Drama",
                  "Horror",
                  "Romance",
                  "Fantasy",
                ]}
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
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
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

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {mockedMovies.map((movie) => (
          <Grid
            key={movie.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Grid container sx={{ width: "100%" }}>
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
