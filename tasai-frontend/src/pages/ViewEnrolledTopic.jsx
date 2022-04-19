import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import _ from "lodash";

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

export const ViewEnrolledTopic = () => {
  let { course_id, topic_id } = useParams();
  const cookies = new Cookies();

  const classes = useStyles();
  const [topicData, setTopicData] = useState(undefined);
  const axiosCall = async () => {
    let trackerData = await AxiosClient.get(
      `http://127.0.0.1:8000/api/personaltrackers`
    );

    checkIfEnrolled(trackerData.data);
    let res = await AxiosClient.get(
      `http://127.0.0.1:8000/api/topics/${topic_id}/assignments`
    );
    setTopicData(res.data);
  };

  useEffect(() => {
    axiosCall();
    console.log(topicData);
  }, []);
  const formatDate = (string) => {
    let returnable = _.replace(string, new RegExp(".[0-9]*Z"), "");
    returnable = _.replace(returnable, "T", " ");
    return returnable;
  };
  const checkIfEnrolled = (data) => {
    for (const element of data) {
      if (element.course_id == course_id) {
        return;
      }
    }
    window.location.href = "http://localhost:3000/mycourses";
  };
  if (topicData === undefined) {
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
              {topicData.title}
            </Typography>
          </Paper>
          <Paper className={classes.head}>
            <Typography
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
              }}
              variant="h4"
              textAlign={"left"}
            >
              Teorija
            </Typography>
            <Typography
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                marginTop: "25px",
              }}
              variant="body1"
              textAlign={"left"}
            >
              {topicData.theory}
            </Typography>
          </Paper>
          {topicData.assignments.length === 0 ? (
            <></>
          ) : (
            <>
              <Paper className={classes.head}>
                <Typography
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                  }}
                  variant="h4"
                  textAlign={"left"}
                >
                  Assignments
                </Typography>
                {topicData.assignments.map((assignment) => (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {assignment.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          <Typography
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: "bold",
                            }}
                            variant={"body1"}
                            textAlign="left"
                          >
                            {assignment.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: "bold",
                            }}
                            variant={"body1"}
                            fontWeight={"bold"}
                            textAlign="center"
                          >
                            Deadline
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: "bold",
                            }}
                            variant={"body1"}
                            fontWeight={"bold"}
                            color={"red"}
                            textAlign="center"
                          >
                            {formatDate(assignment.deadline)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </>
          )}
        </Container>
      </div>
    );
};
