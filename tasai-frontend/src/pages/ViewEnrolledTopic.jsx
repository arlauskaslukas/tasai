import {ExpandMore} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AlertTitle,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import Cookies from "universal-cookie/es6";
import AxiosClient from "../utils/AxiosClient";
import _ from "lodash";
import DataFetchService from "../services/DataFetchService";
import {Error} from "../components/Error";
import {SuccessAlert} from "../components/SuccessAlert";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState([]);
  const [uploadType, setUploadType] = useState(0);
  const [userModels, setUserModels] = useState([]);
  const [userModel, setUserModel] = useState(0);
  const [file, setFile] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  let dfs = new DataFetchService();

  const axiosCall = async () => {
    let trackerData = await AxiosClient.get(
      `http://127.0.0.1:8000/api/personaltrackers`
    );

    checkIfEnrolled(trackerData.data);
    let res = await AxiosClient.get(
      `http://127.0.0.1:8000/api/topics/${topic_id}/assignments`
    );
    setTopicData(res.data);
    let models = await dfs.getUserModels();
    setUserModels(models);
  };

  const resetUploadValues = () => {
    setUserModel(0);
    setFile(undefined);
    setSuccess(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
    resetUploadValues();
  };

  const readFile = (event) => {
    let files = event.target.files;
    setFile(files[0]);
  };

  const handleUploadTypeChange = (value) => {
    resetUploadValues();
    setUploadType(value);
  };

  const Validate = () => {
    setSuccess(false);
    setErrors([]);
    let isDataValid = true;
    if (uploadType === 0) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Upload type has not been chosen"]);
    }
    if (uploadType === 1 && file === undefined) {
      isDataValid = false;
      setErrors((errs) => [...errs, "File has not been chosen"]);
    }
    if (uploadType === 2 && userModel === 0) {
      isDataValid = false;
      setErrors((errs) => [...errs, "ANN model has not been chosen"]);
    }
    return isDataValid;
  };

  const handleConfirmation = async () => {
    if (Validate()) {
      if (uploadType === 1) {
        dfs
          .uploadFileAssignmentEntry(selectedEntry.id, file)
          .then((res) =>
            res === "ok"
              ? setSuccess(true)
              : setErrors([
                  "Serverside error has occured while processing your request",
                ])
          );
      } else if (uploadType === 2) {
        dfs
          .uploadANNAssignmentEntry(selectedEntry.id, userModel)
          .then((res) =>
            res === "ok"
              ? setSuccess(true)
              : setErrors([
                  "Serverside error has occured while processing your request",
                ])
          );
      }
    }
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
        <Dialog
          open={dialogOpen}
          onClose={() => handleClose()}
          aria-labelLedby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Upload assignment entry"}
          </DialogTitle>
          <DialogContent id="alert-dialog-description">
            {errors.length === 0 ? (
              <></>
            ) : (
              <Error subpoints={errors} title={"Error"} />
            )}
            {success ? <SuccessAlert /> : <></>}
            <Alert
              severity="warning"
              style={{ textAlign: "left", marginBlock: "50px" }}
            >
              <AlertTitle>Heads up!</AlertTitle>
              If you do the file upload, make sure the extension is either .py
              or .ipynb. The system currently does not accept other extensions.
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="uploadtype">
                    Assignment upload type
                  </InputLabel>
                  <Select
                    labelId="uploadtype"
                    id="uploadtype"
                    value={uploadType}
                    onChange={(e) => handleUploadTypeChange(e.target.value)}
                  >
                    <MenuItem value={1}>File</MenuItem>
                    <MenuItem value={2}>User created model</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {uploadType === 2 ? (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="usermodel">
                        Choose model to upload
                      </InputLabel>
                      <Select
                        labelId="uploadtype"
                        id="uploadtype"
                        value={userModel}
                        onChange={(e) => setUserModel(e.target.value)}
                      >
                        {userModels.map((model) => (
                          <MenuItem value={model.id}>{model.title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <>
                    <input
                      type={"file"}
                      name="File"
                      accept=".py,.ipynb"
                      onChange={(e) => readFile(e)}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button
              variant="contained"
              autoFocus
              onClick={() => handleConfirmation()}
            >
              Upload
            </Button>
          </DialogActions>
        </Dialog>
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
                        <Grid item xs={12}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              variant={"contained"}
                              onClick={() => {
                                setSelectedEntry(assignment);
                                setDialogOpen(true);
                              }}
                            >
                              UPLOAD ASSIGNMENT ENTRY
                            </Button>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "bold",
                                }}
                                variant="h6"
                              >
                                Upload status:
                              </Typography>
                              <Typography
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "bold",
                                  color: "#edf7ed",
                                }}
                                variant="body1"
                              >
                                Uploaded
                              </Typography>
                            </div>
                          </div>
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
