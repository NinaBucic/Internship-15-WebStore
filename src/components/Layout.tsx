import React from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import logo from "../assets/images/webstore-icon.png";

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
            <img src={logo} alt="Logo" style={{ height: 30 }} />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Web Store
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/add-product">
              Add Product
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;
