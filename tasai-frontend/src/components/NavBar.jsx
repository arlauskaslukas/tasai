import {
  Home,
  Menu,
  Mail,
  MoveToInbox,
  Book,
  Settings,
  Person,
  Logout,
  PersonAdd,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useLayoutEffect } from "react";
import Cookies from "universal-cookie/es6";
import AxiosClient from "../utils/AxiosClient";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

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
            TotalAI
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
                Namai
              </Button>
              <Button href="/courses" color="inherit">
                Kursai
              </Button>
              <Button href={"/testimonials"} color={"inherit"}>
                Atsiliepimai
              </Button>
              <Button href={"/newmodel"} color={"inherit"}>
                Naujas DNT modelis
              </Button>
              {cookies.get("AdminStatus") === "1" ? (
                <>
                  <Button color="inherit" href="/admin">
                    Admin panelė
                  </Button>
                </>
              ) : (
                <></>
              )}
              {cookies.get("Authorization") === undefined ? (
                <>
                  <Button href={"/register"} color="inherit">
                    Registruotis
                  </Button>
                  <Button href={"/login"} color="inherit">
                    Prisijungti
                  </Button>
                </>
              ) : (
                <>
                  <Button href={"/mycourses"} color="inherit">
                    Mano kursai
                  </Button>
                  <Button color="inherit" href="/profile">
                    Profilis
                  </Button>
                  <Button onClick={() => handleLogout()} color="inherit">
                    Atsijungti
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
            <ListItemText primary={"Namai"} />
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
            <ListItemText primary={"Kursai"} />
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
              <ListItemText primary={"Admin panelė"} />
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
                key={"Registruotis"}
              >
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary={"Registruotis"} />
              </ListItem>

              <ListItem
                button
                onClick={() =>
                  (window.location.href = "http://localhost:3000/login")
                }
                key={"Prisijungti"}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={"Prisijungti"} />
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
                <ListItemText primary={"Mano kursai"} />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  (window.location.href = "http://localhost:3000/profile")
                }
                key={"Profilis"}
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
                <ListItemText primary={"Atsijungti"} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};
