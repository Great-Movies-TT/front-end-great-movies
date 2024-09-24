import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "10px 15px",
          backgroundColor: "rgba(80, 95, 111, 1)",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
