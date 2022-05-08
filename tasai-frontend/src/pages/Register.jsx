import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import background from "../assets/background.svg";
import AxiosClient from "../utils/AxiosClient";
import Cookies from "universal-cookie/es6";
import Logo from "../assets/logo.svg";
import { Error } from "../components/Error";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errors, setErrors] = useState([]);

  const cookies = new Cookies();
  const handleRegistration = () => {
    setErrors([]);
    AxiosClient.post("http://127.0.0.1:8000/api/register", {
      name: name,
      email: email,
      password: pwd,
    })
      .then((results) => {
        console.log(results);
        cookies.set("Authorization", results.data.token, { path: "/" });
        cookies.set("AdminStatus", results.data.user.is_admin, { path: "/" });
      })
      .then((res) => {
        if (cookies.get("AdminStatus") === "1") {
          window.location.href = "http://localhost:3000/admin";
        } else {
          window.location.href = "http://localhost:3000/";
        }
      })
      .catch((e) => {
        let errs = e.response.data.errors;
        for (var err in errs) {
          setErrors((old) => [...old, ...errs[err]]);
        }
      });
  };

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
        <Grid
          item
          xs={0}
          lg={6}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Logo} style={{ maxWidth: "30vw" }} />
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
            {errors.length === 0 ? (
              <></>
            ) : (
              <Error title={"Auth error!"} subpoints={errors} />
            )}
            <Typography
              variant={"h4"}
              fontWeight={"bold"}
              color="#F41D6F"
              marginTop={"10%"}
            >
              REGISTER
            </Typography>
            <TextField
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              variant="outlined"
              label="Username"
              style={{ width: "50%", marginTop: "5vh" }}
            />
            <TextField
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              variant="outlined"
              label="Email"
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
              label="Password"
              style={{ width: "50%", marginTop: "5vh" }}
            />
            <Button
              variant="contained"
              onClick={() => handleRegistration()}
              style={{ marginTop: "5vh", backgroundColor: "#0091AD" }}
            >
              Register
            </Button>
            <Typography variant="h6" style={{ marginBlock: "2vh" }}>
              Already have an account?
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
                Login
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
