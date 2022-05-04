import {ExpandMore} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress,
    Paper,
    Typography,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import Cookies from "universal-cookie/es6";
import StripeContainer from "../components/stripe/StripeContainer";
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

export const ViewCourse = () => {
  const cookies = new Cookies();
  const [trackers, setTrackers] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { id } = useParams();
  const classes = useStyles();
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courseData, setCourseData] = useState(undefined);
  const axiosCall = async () => {
    let trackerData = await AxiosClient.get(
      `http://127.0.0.1:8000/api/personaltrackers`
    );
    console.log(trackerData.data);
    setTrackers(trackerData.data);
    checkIfEnrolled(trackerData.data);
    let res = await AxiosClient.get(
      `http://127.0.0.1:8000/api/courses/${id}/topics`
    );
    setCourseData(res.data);
  };
  const handleEnrollClick = () => {
    SendToDB();
    //window.location.href = "http://localhost:3000/mycourses";
  };
  const SendToDB = async () => {
    let res = await AxiosClient.post(
      "http://127.0.0.1:8000/api/progresstrackers",
      {
        course_id: id,
      }
    );
    console.log(res);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handlePaymentReceived = () => {
    setPaymentSubmitted(true);
    handleEnrollClick();
    axiosCall().then((data) => setIsDialogOpen(false));
  };

  useEffect(() => {
    axiosCall();
  }, []);
  const checkIfEnrolled = (data) => {
    console.log(data);
    for (const element of data) {
      console.log(element.course_id == id);
      console.log(id);
      if (element.course_id == id) {
        setIsEnrolled(true);
        console.log(isEnrolled);
        return;
      }
    }
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
        <Dialog
          open={isDialogOpen}
          onClose={() => handleCloseDialog()}
          aria-labelLedby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Rate assignment entry"}
          </DialogTitle>
          <DialogContent id="alert-dialog-description">
            <StripeContainer
              course_id={id}
              onCompletePurchase={handlePaymentReceived}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseDialog()}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Container>
          <Paper className={classes.head}>
            <Typography variant="h4" textAlign={"left"}>
              {courseData.title}
            </Typography>
          </Paper>
          <Paper className={classes.head}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" textAlign={"left"}>
                  Course information
                </Typography>
                <Typography variant="body1" textAlign={"left"}>
                  Course start: {courseData.starts_at}
                </Typography>
                <Typography variant="body1" textAlign={"left"}>
                  Duration in weeks: {courseData.duration}
                </Typography>
                <Typography variant="body1" textAlign={"left"}>
                  Price in euros: {courseData.cost}
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
              >
                {cookies.get("Authorization") === undefined ? (
                  <Typography variant="subtitle1">
                    You have to log in to start learning
                  </Typography>
                ) : isEnrolled ? (
                  <Button disabled variant="contained">
                    Start learning
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleOpenDialog();
                    }}
                    variant="contained"
                  >
                    Enroll
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
          <Paper>
            <Typography variant="h5" textAlign={"left"}>
              Course topics
            </Typography>
          </Paper>
          {courseData.topics.map((topic) => (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{topic.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant={"body1"} textAlign="left">
                  {topic.short_description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </div>
    );
};
