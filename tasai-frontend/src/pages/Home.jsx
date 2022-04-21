import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Cookies from "universal-cookie/es6";
import bg2 from "../assets/bg2.svg";
import AxiosClient from "../utils/AxiosClient";
import Logo from "../assets/logo.svg";

export const Home = () => {
  const cookies = new Cookies();
  return (
    <div
      style={{
        backgroundImage: `url(${bg2})`,
        height: "100vh",
        width: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={Logo} style={{ maxWidth: "10vw" }} />
      <Typography
        style={{ marginBottom: "30px" }}
        variant="h2"
        fontWeight="bold"
        color="white"
      >
        ARTIFICIA ACADEMY
      </Typography>
      <Typography
        variant="h5"
        color="white"
        fontWeight="bold"
        style={{ marginBottom: "25px", fontFamily: "Montserrat, sans-serif" }}
      >
        Create your first artificial neural network with us!
      </Typography>
      <Button
        variant="contained"
        href="/courses"
        size={"large"}
        style={{
          backgroundColor: "#A73579",
          marginBottom: "25px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Browse suggested courses
      </Button>
      {cookies.get("Authorization") === undefined ? (
        <>
          <Typography
            variant={"h6"}
            color="white"
            style={{ marginBottom: "25px" }}
          >
            Already registered?
          </Typography>
          <Button
            href="/login"
            variant="contained"
            size={"large"}
            style={{ marginBottom: "25px" }}
          >
            Login
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
