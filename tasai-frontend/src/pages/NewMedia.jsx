import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie/es6";
import {
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  CircularProgress,
  Rating,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AxiosClient from "../utils/AxiosClient";
import { Error } from "../components/Error";
import { SuccessAlert } from "../components/SuccessAlert";
import _ from "lodash";
import DataFetchService from "../services/DataFetchService";
import { DateTimePicker } from "@mui/lab";

export const NewMedia = () => {
  const [topic, setTopic] = useState(0);
  const [topics, setTopics] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState("");
  const cookies = new Cookies();
  const datafetchservice = new DataFetchService();

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const getTopics = async () => {
    let elements = await datafetchservice.getTopics();
    setTopics(elements);
  };

  useEffect(() => {
    getTopics();
  }, []);

  const Validate = () => {
    let isDataValid = true;
    let num_regex = new RegExp("[1-9][0-9]*");
    setErrors([]);
    if (_.isEqual(file, undefined)) {
      isDataValid = false;
      setErrors((errs) => [...errs, "File has not been uploaded"]);
    }
    if (_.isEqual(topic, 0)) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Topic selection is mandatory"]);
    }
    return isDataValid;
  };

  const handleButtonClick = async () => {
    setSuccess(false);
    if (Validate()) {
      let res = await SendToDB();
      setSuccess(true);
    }
  };

  const SendToDB = async () => {
    let formData = new FormData();
    formData.append("topic_id", topic);
    formData.append("file", file);
    AxiosClient.post("http://127.0.0.1:8000/api/media", formData, {headers:{
      "Content-Type": "multipart/form-data",
    }});
  };

  const readFile = (event) => {
    let files = event.target.files;
    setFile(files[0]);
  };

  if (cookies.get("Authorization") === undefined) {
    return <></>;
  } else if (topics === undefined) {
    return (
      <>
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
      </>
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
              NEW MEDIA FILE
            </Typography>
            <div
              style={{
                display: "flex",
                marginBlock: "30px",
              }}
            >
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                href="/admin/media"
                style={{ backgroundColor: "#B7094C " }}
              >
                Back
              </Button>
            </div>
            {errors.length === 0 ? (
              <></>
            ) : (
              <Error title={"Data submission error"} subpoints={errors} />
            )}
            {success ? (
              <>
                <SuccessAlert />
              </>
            ) : (
              <></>
            )}
            <div>
              <Paper elevation={2} style={{ padding: "25px" }}>
                <Grid container spacing={2} style={{ paddingBlock: "20px" }}>
                  <Grid item xs={12} md={8}>
                    <input
                      type={"file"}
                      name="File"
                      onChange={(e) => readFile(e)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="topic-label">Topic</InputLabel>
                      <Select
                        labelId="topic-label"
                        id="topic-select"
                        value={topic}
                        label="course_id"
                        onChange={handleTopicChange}
                      >
                        {topics.map((topicSelect) => (
                          <MenuItem value={topicSelect.id}>
                            {topicSelect.id} - {topicSelect.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <div
                  style={{
                    paddingBlock: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant={"contained"} onClick={handleButtonClick}>
                    Save
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
        </Container>
      </>
    );
};
