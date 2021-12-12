import { Home, Login, Menu, Mail, MoveToInbox } from "@mui/icons-material";
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
import { width } from "@mui/system";
import Cookies from "universal-cookie/es6";
import AxiosClient from "../utils/AxiosClient";

const useWindowSize = () => {
  const [size, setSize] = useState("lg");

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

export const NavBar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const size = useWindowSize();
  const toggleDrawer = (status) => {
    setDrawerState(status);
  };

  const cookies = new Cookies();

  const handleLogout = () => {
    AxiosClient.post("http://127.0.0.1:8000/api/logout").then((results) => {
      console.log(results);
      if (results.data.message === "Logged out") {
        cookies.remove("Authorization");
        cookies.remove("AdminStatus");
        window.location.href = "http://localhost:3000/login";
      }
    });
  };

  const drawerContent = () => {
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>;
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          {size == "lg" ? (
            <>
              <IconButton size="large" edge="start" sx={{ mr: 2 }}>
                <Home />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                onClick={() => toggleDrawer(true)}
                size="large"
                edge="start"
                sx={{ mr: 2 }}
              >
                <Menu />
                <Drawer
                  anchor={"left"}
                  open={drawerState}
                  onClose={() => toggleDrawer(false)}
                >
                  {drawerContent}
                </Drawer>
              </IconButton>
            </>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TotalAI
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button color="inherit">Namai</Button>
            <Button color="inherit">Kursai</Button>
            <Button color="inherit">Apie mus</Button>
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
                <Button color="inherit">Mano kursai</Button>
                <Button onClick={() => handleLogout()} color="inherit">
                  Atsijungti
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
