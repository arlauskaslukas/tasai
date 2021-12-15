import { Send } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie/es6";
import { Error } from "../components/Error";
import { SuccessAlert } from "../components/SuccessAlert";
import AxiosClient from "../utils/AxiosClient";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  head: {
    padding: "20px",
    marginBottom: "10px",
  },
  paper: {
    padding: "20px",
    height: "100%",
  },
  section: {
    marginBlock: "50px",
  },
  button: {
    width: "75%",
  },
}));

export const EditProfile = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    setSuccess(false);
    if (Validate()) {
      SendToDB();
      setSuccess(true);
    }
  };
  const cookies = new Cookies();
  const getUserData = async () => {
    let res = await AxiosClient.get("http://127.0.0.1:8000/api/getcurrentuser");
    setUserData(res.data);
    setUsername(res.data.name);
    setEmail(res.data.email);
  };
  useEffect(() => {
    if (cookies.get("Authorization") === undefined) {
      window.location.href = "http://127.0.0.1:3000/login";
    }
    getUserData();
  }, []);

  const SendToDB = async () => {
    let res = await AxiosClient.put("http://127.0.0.1:8000/api/users", {
      id: userData.id,
      email: email,
      name: username,
    });
  };

  const Validate = () => {
    let isDataValid = true;
    let num_regex = new RegExp("[1-9][0-9]*");
    setErrors([]);

    if (!_.isString(username) || _.isEqual(username, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Naudotojo vardas privalomas"]);
    }
    if (!_.isString(email) || _.isEqual(email, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Elektroninis paštas privalomas"]);
    }
    return isDataValid;
  };
  if (userData === undefined) {
    return (
      <div>
        <LinearProgress />
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <CircularProgress color={"secondary"} />
        </div>
      </div>
    );
  } else
    return (
      <div>
        <Container>
          <div>
            <Paper className={classes.head}>
              <Typography variant="h4" textAlign={"left"}>
                Profilio redagavimas
              </Typography>
            </Paper>
            {errors.length === 0 ? (
              <></>
            ) : (
              <Error title={"Klaida įvedant duomenis"} subpoints={errors} />
            )}
            {success ? (
              <>
                <SuccessAlert />
              </>
            ) : (
              <></>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ paddingBlock: "20px" }}>
                <TextField
                  value={username === undefined ? "" : username}
                  onChange={(val) => setUsername(val.target.value)}
                  fullWidth
                  label="Naudotojo vardas"
                />
              </Grid>
              <Grid item xs={12} style={{ paddingBlock: "20px" }}>
                <TextField
                  value={email === undefined ? "" : email}
                  onChange={(val) => setEmail(val.target.value)}
                  fullWidth
                  label="Elektroninis paštas"
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                marginBlock: "50px",
              }}
            >
              <Button
                onClick={() => handleButtonClick()}
                variant="contained"
                endIcon={<Send />}
              >
                Išsaugoti
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
};
