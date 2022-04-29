import { ExpandMore, Send } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "universal-cookie/es6";
import AxiosClient from "../utils/AxiosClient";

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

export const ViewEnrolledCourse = () => {
  const cookies = new Cookies();

  const { id } = useParams();
  const classes = useStyles();
  const [courseData, setCourseData] = useState(undefined);
  const axiosCall = async () => {
    let trackerData = await AxiosClient.get(
      `http://127.0.0.1:8000/api/personaltrackers`
    );

    checkIfEnrolled(trackerData.data);
    let res = await AxiosClient.get(
      `http://127.0.0.1:8000/api/courses/${id}/topics`
    );
    setCourseData(res.data);
  };

  useEffect(() => {
    axiosCall();
  }, []);
  const checkIfEnrolled = (data) => {
    for (const element of data) {
      if (element.course_id == id) {
        return;
      }
    }
    window.location.href = "http://localhost:3000/mycourses";
  };
  if (courseData === undefined) {
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
  } else
    return (
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <Paper className={classes.head}>
            <Typography
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
              }}
              variant="h4"
              textAlign={"left"}
            >
              {courseData.title}
            </Typography>
          </Paper>
          <Paper className={classes.head}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                  }}
                  variant="h5"
                  textAlign={"left"}
                >
                  Course information
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                  }}
                  variant="body1"
                  textAlign={"left"}
                >
                  Course starts at: {courseData.starts_at}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                  }}
                  variant="body1"
                  textAlign={"left"}
                >
                  Duration in weeks: {courseData.duration}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "right",
                }}
              ></Grid>
            </Grid>
          </Paper>
          <Paper
            elevation={2}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBlock: "20px",
              paddingInline: "25px",
            }}
          >
            <Typography
              variant={"h5"}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
              }}
            >
              Course live lessons timetable
            </Typography>
            <Button variant={"contained"} href={`/mycourses/${id}/timetable`}>
              Review live lessons
            </Button>
          </Paper>
          <Paper style={{ padding: "20px" }}>
            <Typography
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
              }}
              variant="h5"
              textAlign={"left"}
            >
              Course topics
            </Typography>
            {courseData.topics.map((topic) => (
              <Accordion key={topic.id} style={{ marginTop: "20px" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {topic.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: "bold",
                    }}
                    variant={"body1"}
                    textAlign="left"
                  >
                    {topic.short_description}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      href={`/mycourses/${id}/topic/${topic.id}`}
                      variant={"contained"}
                    >
                      Learn
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Container>
      </div>
    );
};
