import { WindowSharp } from "@mui/icons-material";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Cookies from "universal-cookie/es6";
import background from "../assets/background.svg";
import AxiosClient from "../utils/AxiosClient";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const cookies = new Cookies();

  const handleLogin = () => {
    AxiosClient.post("http://127.0.0.1:8000/api/login", {
      email: email,
      password: pwd,
    }).then((results) => {
      console.log(results);
      cookies.set("Authorization", results.data.token);
      cookies.set("AdminStatus", results.data.user.is_admin);
      if (cookies.get("AdminStatus") === "1") {
        window.location.href = "http://localhost:3000/admin";
      } else {
        window.location.href = "http://localhost:3000/";
      }
    });
  };

  if (cookies.get("Authorization") !== undefined) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">You are already logged in.</Typography>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
          width: "100vw",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={0} lg={6}>
            karoce ce bus logo. On hover dideja
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            style={{
              height: "100%",
              backgroundColor: "#FFFFFF",
              borderTopRightRadius: "12%",
              borderBottomLeftRadius: "12%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant={"h4"}
                fontWeight={"bold"}
                color="#B7094C"
                marginTop={"20%"}
              >
                PRISIJUNGTI
              </Typography>
              <TextField
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                variant="outlined"
                label="Prisijungimo paštas"
                style={{ width: "50%", marginTop: "5vh" }}
              />
              <TextField
                type="password"
                value={pwd}
                required
                onChange={(event) => setPwd(event.target.value)}
                variant="outlined"
                label="Slaptažodis"
                style={{ width: "50%", marginTop: "5vh" }}
              />
              <Button
                onClick={() => handleLogin()}
                variant="contained"
                style={{ marginTop: "5vh", backgroundColor: "#0091AD" }}
              >
                Prisijungti
              </Button>

              <Typography variant="h6" style={{ marginBlock: "2vh" }}>
                Neturite paskyros ar pamiršote slaptažodį?
              </Typography>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  width: "50%",
                  justifyContent: "space-between",
                }}
              >
                <Button variant="contained" href={"/register"}>
                  Registruotis
                </Button>
                <Button variant="contained" href={"/forgot-password"}>
                  Atkurti slaptažodį
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
};
