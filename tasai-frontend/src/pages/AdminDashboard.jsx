import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import AddTaskIcon from "@mui/icons-material/AddTask";

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
  return (
    <div
      style={{
        backgroundColor: "#E6EAF2",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container>
        <Paper className={classes.head}>
          <Typography variant="h4" textAlign={"left"}>
            Administratoriaus panelė
          </Typography>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6" textAlign="left">
                Kursų kontrolės centras
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
                  Valdyti kursus
                </Button>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  startIcon={<AddIcon />}
                  href="/admin/courses/new"
                >
                  Pridėti kursą
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className={classes.section}>
            <Paper className={classes.paper} elevation={2}>
              <Typography variant="h6" textAlign="left">
                Temų kontrolės centras
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
                >
                  <VisibilityIcon /> Valdyti temas
                </Button>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <AddIcon /> Pridėti temą
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6" textAlign="left">
                Naudotojų valdymo centras
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    marginBlock: "20px",
                    backgroundColor: "#C11F6B",
                    justifyContent: "space-around",
                  }}
                >
                  <VisibilityIcon /> Valdyti naudotojus
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "5%" }}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" textAlign="left">
                Atsiskaitymų centras
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
                >
                  <VisibilityIcon /> Valdyti atsiskaitymus
                </Button>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <AddTaskIcon /> Vertinti atsiskaitymus
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" textAlign="left">
                Neseniai prie kursų prisijungę vartotojai
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
