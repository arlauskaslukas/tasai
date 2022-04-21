import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Check,
  DataObject,
  EmailTwoTone,
} from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import DataFetchService from "../services/DataFetchService";
import CheckIcon from "@mui/icons-material/Check";

const mockData = [
  {
    entry_title: "Test entry title",
    lesson_time: "2022-02-09 09:00:00",
    link: "http://link.to/lesson/livestream",
  },
  {
    entry_title: "Test entry title 2",
    lesson_time: "2022-02-09 11:00:00",
    link: "http://link.to/lesson/livestream2",
  },
];

export const ViewCourseTimetable = () => {
  const { id } = useParams();
  const datafetchservice = new DataFetchService();
  const [timetables, setTimetables] = useState(undefined);
  const [uris, setUris] = useState([]);
  const [participations, setParticipations] = useState([]);

  async function dataProcessing(data) {
    data.forEach(async (element) => {
      let uri = await datafetchservice.getTimetableiCalFileURI(element.id);
      setUris((olduris) => [...olduris, uri]);
      let participation = await datafetchservice.checkIfUserParticipated(
        element.topic_id
      );
      setParticipations((oldparticipations) => [
        ...oldparticipations,
        participation,
      ]);
    });
    console.log(data);
    return data;
  }

  const sendAttendance = (idx, topic_id) => {
    datafetchservice.sendAttendance(topic_id).then((message) => {
      if (message === "ok") {
        let mapped = participations.map((participation, pid) => {
          return pid === idx ? true : participation;
        });
        setParticipations(mapped);
      } else {
        //errorhandle
      }
    });
  };

  useEffect(async () => {
    let data = [];
    await datafetchservice
      .getCourseTimetable(id)
      .then((obj) => {
        return dataProcessing(obj);
      })
      .then((obj) => (data = obj));
    setTimetables(data);
  }, []);
  if (timetables === undefined) {
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
      <>
        <Container style={{ minHeight: "100vh" }}>
          <div style={{ paddingTop: "50px" }}>
            <Typography
              textAlign={"start"}
              variant="h4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              COURSE LIVE LESSONS TIMETABLE
            </Typography>
            <div
              style={{
                display: "flex",
                marginBlock: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<ArrowBack />}
                  href={`/mycourses/${id}`}
                  style={{ backgroundColor: "#B7094C " }}
                >
                  Atgal
                </Button>
                <Button variant="contained" startIcon={<DownloadIcon />}>
                  Download iCal file
                </Button>
              </div>
            </div>
            {timetables.map((entry, idx) => (
              <Paper
                elevation={2}
                style={{ padding: "25px", marginBlock: "25px" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography
                      variant={"h5"}
                      textAlign={"left"}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "25px",
                      }}
                    >
                      {entry.entry_title}
                    </Typography>
                    <Typography
                      variant={"body1"}
                      textAlign={"left"}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "25px",
                      }}
                    >
                      Lesson time: {entry.lesson_time}
                    </Typography>
                    <Typography
                      variant={"body1"}
                      textAlign={"left"}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "25px",
                      }}
                    >
                      Join link: <a href={entry.link}>{entry.link}</a>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      {uris[idx] !== undefined ? (
                        <Button
                          href={uris[idx]}
                          variant="contained"
                          color="secondary"
                          download
                        >
                          Download iCal file
                        </Button>
                      ) : (
                        <></>
                      )}
                      {participations[idx] ? (
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckIcon />}
                        >
                          Participation marked
                        </Button>
                      ) : (
                        <Button
                          onClick={() => sendAttendance(idx, entry.topic_id)}
                          variant="contained"
                          color="primary"
                        >
                          Mark participation
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
        </Container>
      </>
    );
};
