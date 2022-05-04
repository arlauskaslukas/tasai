import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Button, Container, Paper, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import DataFetchService from "../services/DataFetchService";

export const DownloadTimetable = () => {
  const { id } = useParams();
  const datafetchservice = new DataFetchService();
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    let data = datafetchservice.getCourseTimetable(id);
    console.log(data);
    setTimetables(data);
  }, [id]);

  return (
    <>
      <Container style={{ minHeight: "100vh" }}>
        <div style={{ paddingTop: "50px" }}>
          <Typography
            textAlign={"start"}
            variant="h4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            DOWNLOADING THESE COURSES:
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
                BACK
              </Button>
              <Button variant="contained" startIcon={<DownloadIcon />}>
                DOWNLOAD
              </Button>
            </div>
          </div>
          {timetables.map((entry) => (
            <Paper
              elevation={2}
              style={{ padding: "25px", marginBlock: "25px" }}
            >
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
                LESSON TIME: {entry.lesson_time}
              </Typography>
              <Typography
                variant={"body1"}
                textAlign={"left"}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  marginBottom: "25px",
                }}
              >
                JOIN LINK: <a href={entry.link}>{entry.link}</a>
              </Typography>
            </Paper>
          ))}
        </div>
      </Container>
    </>
  );
};
