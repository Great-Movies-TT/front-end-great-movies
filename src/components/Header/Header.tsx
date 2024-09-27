import { pagesList } from "@/constants/Header/pagesList";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { ROUTES } from "@/enums/routes/Routes";
import { Link } from "react-router-dom";
import theme from "@/styles/muiTheme";
import { selectFavotires } from "@/redux/selectors/favoriteSelectors";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const favorites = selectFavotires();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isMdUp && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMdUp, isMenuOpen]);

  const handleOpenNavMenu = (_event: React.MouseEvent<HTMLElement>) => {
    setIsMenuOpen(true);
  };

  const handleCloseNavMenu = () => {
    setIsMenuOpen(false);
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
            <Drawer
              anchor="top"
              open={isMenuOpen}
              onClose={handleCloseNavMenu}
              PaperProps={{
                sx: {
                  backgroundColor: theme.palette.info.dark,
                  py: 4,
                },
              }}
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              {pagesList.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ textAlign: "center", mb: 1 }}
                >
                  <Box
                    component={Link}
                    to={page.href}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      textDecoration: "none",
                      color: theme.palette.common.white,
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "primary.main",
                        transition: "color 0.3s ease",
                      },
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        position: "relative",
                        maxWidth: "fit-content",
                        overflow: "visible",
                        my: 2,
                        color: theme.palette.common.white,
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          transition: "color 0.3s ease",
                        },
                      }}
                    >
                      {page.name}

                      {page.name === "Favorites" && favorites.length > 0 && (
                        <Box
                          component="span"
                          sx={{
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            top: -10,
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
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Drawer>
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
