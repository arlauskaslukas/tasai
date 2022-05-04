import {Button, CircularProgress, Container, Grid, LinearProgress, Paper, Typography,} from "@mui/material";
import React, {useEffect, useState} from "react";
import AxiosClient from "../utils/AxiosClient";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  head: {
    padding: "20px",
    marginBottom: "10px",
  },
  paper: {
    padding: "20px",
    marginBlock: "10px",
    height: "100%",
  },
  section: {
    marginBlock: "50px",
  },
  button: {
    width: "75%",
  },
}));

export const MyCourses = () => {
  const classes = useStyles();
  const [progressData, setProgressData] = useState(undefined);
  const axiosCall = async () => {
    let res = await AxiosClient.get(
      "http://127.0.0.1:8000/api/personaltrackers"
    );
    console.log(res.data);
    setProgressData(res.data);
  };
  useEffect(() => {
    axiosCall();
  }, []);
  if (progressData === undefined) {
    return (
      <div>
        <LinearProgress />
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "75vh",
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
  } else if (progressData.length === 0) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <Paper className={classes.head}>
            <Typography
              variant="h4"
              textAlign={"left"}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              My courses
            </Typography>
          </Paper>
          <Paper
            elevation={2}
            style={{
              minHeight: "40vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography
              style={{ fontFamily: "Montserrat, sans-serif" }}
              variant="h5"
              fontWeight="bold"
              textAlign="center"
            >
              You don't have any courses yet
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button href={`/courses`} variant={"contained"}>
                Discover courses
              </Button>
            </div>
          </Paper>
        </Container>
      </div>
    );
  } else
    return (
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <Paper className={classes.head}>
            <Typography
              style={{ fontFamily: "Montserrat, sans-serif" }}
              variant="h4"
              textAlign={"left"}
            >
              My courses
            </Typography>
          </Paper>
          {progressData.map((progress) => {
            console.log(progress);
          })}
          <Grid container spacing={2}>
            {progressData.map((progress) => (
              <Grid item xs={12} md={6}>
                <Paper style={{ padding: "25px" }}>
                  <Typography
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                    variant="h5"
                    fontWeight="bold"
                    textAlign="left"
                  >
                    {progress.course[0].title}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      href={`/mycourses/${progress.course_id}`}
                      variant={"contained"}
                    >
                      Learn
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
};
