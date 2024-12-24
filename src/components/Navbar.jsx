
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const pages = [
  {
    label: "Home",
    path: "/GreenAlternative",
  },
  {
    label: "About",
    path: "/AboutPage",
  },
  {
    label: "Favourites",
    path: "/FavouritesPage",
  },
];

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        EcoChoice
      </Typography>
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link to={item.path} style={{ textDecoration: "none", width: "100%" }}>
              <ListItemButton sx={{ textAlign: "center", width: "100%" }}>
                <span style={{ color: "black" }}>
                  {item.label}
                </span>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="static"
        sx={{
          backgroundColor: "#2f4f2f",
          height: "150px",
          width: "100%",
          left: 0,
          top: 0,
          margin: 0,
        }}
      >
        <Toolbar sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to= "/GreenAlternative">
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "'Poppins', sans-serif",
              color:"white",
            }}>
            EcoChoice
          </Typography>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>

            {pages.map((item) => (
              <Button key={item.label}>
                <Link style={{color: "#FFFFFF", fontSize:"18px"}} to={item.path}> {item.label} </Link>
              </Button>
            ))}

          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func
};

