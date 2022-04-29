import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useState, useEffect } from "react";
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

export const AdminDashboard = ({ LoginStatus }) => {
  const classes = useStyles();
  const [recentJoins, setRecentJoins] = useState([]);

  useEffect(() => {
    const axiosCall = async () => {
      const res = await AxiosClient.get(
        "http://127.0.0.1:8000/api/recentjoins"
      );
      let elements = res.data;
      console.log(elements);
      setRecentJoins(elements);
    };
    axiosCall();
  }, []);

  const formatDate = (string) => {
    let returnable = _.replace(string, new RegExp(".[0-9]*Z"), "");
    returnable = _.replace(returnable, "T", " ");
    return returnable;
  };

  return (
    <div
      style={{
        backgroundColor: "#E6EAF2",
        backgroundSize: "cover",
        height: "100vh",
        paddingBlock: "100px",
      }}
    >
      <Container>
        <Paper className={classes.head}>
          <Typography
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bolder",
            }}
            variant="h4"
            textAlign={"left"}
          >
            Admin dashboard
          </Typography>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography
                variant="h6"
                textAlign="left"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Courses management
              </Typography>
              <div style={{ display: "inline-block" }}>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                  }}
                  startIcon={<VisibilityIcon />}
                  href="/admin/courses"
                >
                  Manage courses
                </Button>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  startIcon={<AddIcon />}
                  href="/admin/courses/new"
                >
                  Add course
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                }}
                variant="h6"
                textAlign="left"
              >
                Topics management
              </Typography>
              <div style={{ display: "inline-block" }}>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  href={"/admin/topics"}
                  startIcon={<VisibilityIcon />}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                    justifyContent: "space-around",
                  }}
                >
                  Manage topics
                </Button>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  startIcon={<AddIcon />}
                  style={{
                    justifyContent: "space-evenly",
                  }}
                  href={"/admin/topics/new"}
                >
                  Add topic
                </Button>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  href={"/admin/media"}
                  startIcon={<VisibilityIcon />}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                    justifyContent: "space-around",
                  }}
                >
                  Manage media
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                }}
                variant="h6"
                textAlign="left"
              >
                Users management
              </Typography>
              <div style={{ display: "inline-block" }}>
                <Button
                  className={classes.button}
                  href="/admin/users"
                  startIcon={<VisibilityIcon />}
                  variant={"contained"}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                  }}
                >
                  Manage users
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "5%" }}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                }}
                variant="h6"
                textAlign="left"
              >
                Courses timetables management
              </Typography>
              <div style={{ display: "inline-block" }}>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                    justifyContent: "space-around",
                  }}
                  href={"/admin/timetables"}
                  startIcon={<VisibilityIcon />}
                >
                  Manage timetables
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                }}
                variant="h6"
                textAlign="left"
              >
                Attendance management
              </Typography>
              <div style={{ display: "inline-block" }}>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                    justifyContent: "space-around",
                  }}
                  href={"/admin/attendance"}
                  startIcon={<VisibilityIcon />}
                >
                  Review attendance
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "5%" }}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                }}
                variant="h6"
                textAlign="left"
              >
                Assignments management
              </Typography>
              <div style={{ display: "inline-block" }}>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                    justifyContent: "space-around",
                  }}
                  href={"/admin/assignments"}
                  startIcon={<VisibilityIcon />}
                >
                  Manage assignments
                </Button>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                    justifyContent: "space-around",
                  }}
                  href={"/admin/assignments/entries"}
                  startIcon={<VisibilityIcon />}
                >
                  Review user submissions
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                }}
                variant="h6"
                textAlign="left"
              >
                Recently joined users
              </Typography>
              <List>
                {recentJoins.map((row) => (
                  <ListItem>
                    <ListItemText
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "bold",
                      }}
                      primary={`${row.user} - ${row.course} - ${formatDate(
                        row.created_at
                      )}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
