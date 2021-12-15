import React, { useEffect, useState } from "react";
import AxiosClient from "../utils/AxiosClient";
import suggested1 from "../assets/suggested1.svg";
import suggested2 from "../assets/suggested2.svg";
import suggested3 from "../assets/suggested3.svg";
import {
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

export const ViewCourses = () => {
  const [courseData, setCourseData] = useState(undefined);
  const axiosCall = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/topcourses");
    setCourseData(res.data);
  };
  const getBg = (idx) => {
    return idx === 1 ? suggested1 : idx === 2 ? suggested2 : suggested3;
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
        {courseData.map((course, idx) => (
          <div
            style={{
              backgroundImage: `url(${getBg(idx)})`,
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
            <Paper
              style={{
                backgroundColor: `rgba(255,255,255,0.7)`,
                padding: "20px",
                width: "50%",
              }}
            >
              <Typography
                style={{
                  marginBottom: "20px",
                  fontFamily: "Montserrat, sans-serif",
                }}
                fontWeight={"bold"}
                variant={"h3"}
              >
                {course.title}
              </Typography>
              <Typography
                style={{
                  marginBottom: "20px",
                  fontFamily: "Montserrat, sans-serif",
                }}
                fontWeight="bold"
                flexWrap={"wrap"}
                variant={"h6"}
              >
                {course.short_description}
              </Typography>
              <Grid style={{ marginBottom: "20px" }} container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Typography
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                    fontWeight={"bold"}
                  >
                    Pradžios data:
                  </Typography>
                  <Typography style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {course.starts_at}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                    fontWeight={"bold"}
                  >
                    Kurso kaina:
                  </Typography>
                  <Typography style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {course.cost}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                    fontWeight={"bold"}
                  >
                    Trukmė savaitėmis:
                  </Typography>
                  <Typography style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {course.duration}
                  </Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant={"contained"}
                  href={"/morecourses"}
                  style={{ backgroundColor: "#A73579" }}
                >
                  Daugiau kursų
                </Button>
                <Button variant={"contained"} href={`/course/${course.id}`}>
                  Peržiūrėti
                </Button>
              </div>
            </Paper>
          </div>
        ))}
      </div>
    );
};
