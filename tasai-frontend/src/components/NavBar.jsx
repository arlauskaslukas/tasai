import {
  Book,
  Home,
  Logout,
  Menu,
  Person,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import Cookies from "universal-cookie/es6";
import AxiosClient from "../utils/AxiosClient";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const useWindowSize = () => {
  const [size, setSize] = useState(window.innerWidth >= 900 ? "lg" : "sm");

  useLayoutEffect(() => {
    function handleResize() {
      setSize(window.innerWidth >= 900 ? "lg" : "sm");
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerWidth = 240;

export const NavBar = () => {
  const size = useWindowSize();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const cookies = new Cookies();

  const handleLogout = () => {
    AxiosClient.post("http://127.0.0.1:8000/api/logout").then((results) => {
      console.log(results);
      if (results.data.message === "Logged out") {
        cookies.remove("Authorization", { path: "/" });
        cookies.remove("AdminStatus", { path: "/" });
        window.location.href = "http://localhost:3000/login";
      }
    });
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          {size === "lg" ? (
            <>
              <IconButton size="large" edge="start" sx={{ mr: 2 }}>
                <Home />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <Menu />
              </IconButton>
            </>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Artificia
          </Typography>
          {size === "lg" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button href="/" color="inherit">
                Home
              </Button>
              <Button href="/courses" color="inherit">
                Courses
              </Button>
              <Button href={"/testimonials"} color={"inherit"}>
                Testimonials
              </Button>
              {cookies.get("AdminStatus") === "1" ? (
                <>
                  <Button color="inherit" href="/admin">
                    Admin panel
                  </Button>
                </>
              ) : (
                <></>
              )}
              {cookies.get("Authorization") === undefined ? (
                <>
                  <Button href={"/register"} color="inherit">
                    Register
                  </Button>
                  <Button href={"/login"} color="inherit">
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button href={"/newmodel"} color={"inherit"}>
                    New ANN model
                  </Button>
                  <Button href={"/mycourses"} color="inherit">
                    My courses
                  </Button>
                  <Button color="inherit" href="/profile">
                    Profile
                  </Button>
                  <Button onClick={() => handleLogout()} color="inherit">
                    Logout
                  </Button>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => (window.location.href = "http://localhost:3000/")}
            key={"Namai"}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              (window.location.href = "http://localhost:3000/courses")
            }
            key={"Kursai"}
          >
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary={"Courses"} />
          </ListItem>
          {cookies.get("AdminStatus") === "1" ? (
            <ListItem
              button
              onClick={() =>
                (window.location.href = "http://localhost:3000/admin")
              }
              key={"Admin"}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={"Admin panel"} />
            </ListItem>
          ) : (
            <></>
          )}
        </List>
        <Divider />
        <List>
          {cookies.get("Authorization") === undefined ? (
            <>
              <ListItem
                button
                onClick={() =>
                  (window.location.href = "http://localhost:3000/register")
                }
                key={"Register"}
              >
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary={"Register"} />
              </ListItem>

              <ListItem
                button
                onClick={() =>
                  (window.location.href = "http://localhost:3000/login")
                }
                key={"Login"}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                onClick={() =>
                  (window.location.href = "http://localhost:3000/mycourses")
                }
                key={"Mano kursai"}
              >
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText primary={"My courses"} />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  (window.location.href = "http://localhost:3000/profile")
                }
                key={"Profile"}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={"Profilis"} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleLogout()}
                key={"Atsijungti"}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};
