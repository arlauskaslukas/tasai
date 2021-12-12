import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import background from "../assets/background.svg";
import AxiosClient from "../utils/AxiosClient";
import Cookies from "universal-cookie/es6";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const cookies = new Cookies();
  console.log(cookies.get("Authorization"));

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
              color="#F41D6F"
              marginTop={"20%"}
            >
              REGISTRUOTIS
            </Typography>
            <TextField
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              variant="outlined"
              label="Jūsų vardas"
              style={{ width: "50%", marginTop: "5vh" }}
            />
            <TextField
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              variant="outlined"
              label="Elektroninis paštas"
              style={{ width: "50%", marginTop: "5vh" }}
            />
            <TextField
              required
              value={pwd}
              onChange={(event) => {
                setPwd(event.target.value);
              }}
              type="password"
              variant="outlined"
              label="Slaptažodis"
              style={{ width: "50%", marginTop: "5vh" }}
            />
            <Button
              variant="contained"
              style={{ marginTop: "5vh", backgroundColor: "#0091AD" }}
            >
              Registruotis
            </Button>
            <Typography variant="h6" style={{ marginBlock: "2vh" }}>
              Jau turite paskyrą?
            </Typography>
            <div
              style={{
                padding: "20px",
                display: "flex",
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                href={"/login"}
                style={{ backgroundColor: "#F41D6F" }}
              >
                Prisijungti
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
