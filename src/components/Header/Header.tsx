import { pagesList } from "@/constants/Header/pagesList";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ROUTES } from "@/enums/routes/Routes";
import { Link } from "react-router-dom";
import theme from "@/styles/muiTheme";
import { selectFavotires } from "@/redux/selectors/favoriteSelectors";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const favorites = selectFavotires();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setIsMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setIsMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.common.black }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Box component={Link} to={ROUTES.HOME}>
              <Box
                component="img"
                src={
                  "https://s.dou.ua/CACHE/images/img/static/companies/LOGO_VRB_2_1/7d27320406462752bd958b7afdf7e364.png"
                }
                alt="VRB Tech Logo"
                width={100}
                height={50}
                style={{ cursor: "pointer", marginRight: "20px" }}
              />
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={isMenuOpen}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pagesList.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ textAlign: "center" }}
                >
                  <Box
                    component={Link}
                    onClick={handleCloseNavMenu}
                    to={page.href}
                    sx={{
                      textDecoration: "none",
                      color: theme.palette.common.black,
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: theme.palette.primary.main,
                        transition: "color 0.3s ease",
                      },
                    }}
                  >
                    {page.name}
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Box component={Link} to={ROUTES.HOME}>
              <Box
                component="img"
                src={
                  "https://s.dou.ua/CACHE/images/img/static/companies/LOGO_VRB_2_1/7d27320406462752bd958b7afdf7e364.png"
                }
                alt="VRB Tech Logo"
                width={100}
                height={50}
                sx={{ cursor: "pointer", marginRight: "20px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 5,
              justifyContent: "flex-end",
            }}
          >
            {pagesList.map((page) => (
              <Box
                component={Link}
                key={page.id}
                onClick={handleCloseNavMenu}
                to={page.href}
                sx={{
                  position: "relative",
                  color: theme.palette.common.white,
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transition: "color 0.3s ease",
                  },
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    my: 2,
                    display: "block",
                    color: theme.palette.common.white,
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transition: "color 0.3s ease",
                    },
                  }}
                >
                  {page.name}
                </Typography>
                {page.name === "Favorites" && favorites.length > 0 && (
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      top: 7,
                      right: -15,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                    }}
                  >
                    {favorites.length}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
