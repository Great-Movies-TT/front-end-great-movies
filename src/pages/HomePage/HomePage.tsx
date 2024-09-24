import { Card } from "@/components";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { mockedMovies } from "@/constants";

function HomePage() {
  return (
    <Box>
      <Grid container spacing={4}>
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
    </Box>
  );
}

export default HomePage;
