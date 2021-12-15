import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
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

export const MoreCourses = () => {
  const classes = useStyles();
  const [courseData, setCourseData] = useState(undefined);
  const axiosCall = async () => {
    let res = await AxiosClient.get("http://127.0.0.1:8000/api/courses");
    setCourseData(res.data);
  };
  useEffect(() => {
    axiosCall();
  }, []);
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
      <div>
        <Container>
          <Paper className={classes.head}>
            <Typography variant="h4" textAlign={"left"}>
              Visi kursai
            </Typography>
          </Paper>

          {courseData.map((course) => (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{course.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant={"body1"} textAlign="left">
                  {course.long_description}
                </Typography>
                <Typography variant="h6" textAlign="left" fontWeight="bold">
                  Papildoma kurso informacija:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Kurso pradžia: {course.starts_at}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Kurso trukmė savaitėmis: {course.duration}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Kurso kaina eurais: {course.cost}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    marginTop: "25px",
                  }}
                >
                  <Button variant={"contained"} href={`/course/${course.id}`}>
                    Peržiūrėti kurso temas
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </div>
    );
};
