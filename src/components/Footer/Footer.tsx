import { Box, Typography } from "@mui/material";
import theme from "@/styles/muiTheme";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.common.black,
        minHeight: "100px",
        color: theme.palette.common.white,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Made by Mykola Maik
      </Typography>
    </Box>
  );
};
