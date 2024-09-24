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

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
            <Link to={ROUTES.HOME}>
              <img
                src={
                  "https://s.dou.ua/CACHE/images/img/static/companies/LOGO_VRB_2_1/7d27320406462752bd958b7afdf7e364.png"
                }
                alt="VRB Tech Logo"
                width={100}
                height={50}
                style={{ cursor: "pointer", marginRight: "20px" }}
              />
            </Link>
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
                  <Box component={Link} onClick={handleCloseNavMenu} to={page.href} sx={{textDecoration: "none"}}>
                    {page.name}
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Link to={ROUTES.HOME}>
              <img
                src={
                  "https://s.dou.ua/CACHE/images/img/static/companies/LOGO_VRB_2_1/7d27320406462752bd958b7afdf7e364.png"
                }
                alt="VRB Tech Logo"
                width={100}
                height={50}
                style={{ cursor: "pointer", marginRight: "20px" }}
              />
            </Link>
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
              <Link key={page.id} onClick={handleCloseNavMenu} to={page.href}>
                <Typography
                  noWrap
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
