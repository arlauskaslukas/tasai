import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import background from "../assets/background.svg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
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
};
