import { ArrowBack, Send } from "@mui/icons-material";
import { DatePicker, DateTimePicker } from "@mui/lab";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import moment from "moment";
import React, { useState, useEffect } from "react";
import AxiosClient from "../utils/AxiosClient";
import { Error } from "../components/Error";
import { SuccessAlert } from "../components/SuccessAlert";
import { useParams } from "react-router";

export const EditAssignment = () => {
  let { id } = useParams();
  const [topicData, setTopicData] = useState(undefined);
  const [topic_id, setTopic_id] = useState(0);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = async () => {
    setSuccess(false);
    if (Validate()) {
      let res = await SendToDB();
      setSuccess(true);
    }
  };

  const handleChange = (event) => {
    setTopic_id(event.target.value);
  };

  const getAssignmentData = async () => {
    const res = await AxiosClient.get(
      `http://127.0.0.1:8000/api/assignments/${id}`
    );
    setTitle(res.data.title);
    setDeadline(res.data.deadline);
    setShortDesc(res.data.description);
    setTopic_id(res.data.topic_id);
    axiosCall(res.data.topic_id);
  };

  const axiosCall = async (value) => {
    const res = await AxiosClient.get(
      `http://127.0.0.1:8000/api/topics/${value}`
    );
    setTopicData(res.data.title);
  };
  useEffect(() => {
    getAssignmentData();
  }, []);

  const SendToDB = async () => {
    let res = await AxiosClient.put("http://127.0.0.1:8000/api/assignments", {
      title: title,
      id: id,
      deadline: moment(deadline).format("YYYY-MM-DD HH:mm:ss"),
      topic_id: topic_id,
      description: shortDesc,
    });
  };

  const Validate = () => {
    let isDataValid = true;
    let num_regex = new RegExp("[1-9][0-9]*");
    setErrors([]);

    if (!_.isString(title) || _.isEqual(title, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Assignment title is a mandatory field"]);
    }
    if (!_.isString(shortDesc) || _.isEqual(shortDesc, "")) {
      isDataValid = false;
      setErrors((errs) => [
        ...errs,
        "Assignment description is a mandatory field",
      ]);
    }
    if (_.isEqual(deadline, "")) {
      isDataValid = false;
      setErrors((errs) => [
        ...errs,
        "Assignment deadline is a mandatory field",
      ]);
    }
    if (topic_id < 1) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Topic selection is mandatory"]);
    }
    return isDataValid;
  };
  if (topicData === undefined) {
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
      <div>
        <Container>
          <div>
            <Typography textAlign={"start"} variant="h4">
              UPDATE ASSIGNMENT DATA
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
                href="/admin/assignments"
                style={{ backgroundColor: "#B7094C " }}
              >
                BACK
              </Button>
            </div>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                <Select
                  disabled
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={topic_id}
                  label="topic_id"
                  onChange={handleChange}
                >
                  <MenuItem value={topic_id}>
                    {topic_id} - {topicData}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                label="Assignment title"
                required
                value={title}
                onChange={(val) => {
                  setTitle(val.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DateTimePicker
                fullWidth
                label="Assignment deadline"
                value={deadline}
                onChange={(value) => setDeadline(value)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                rows={3}
                value={shortDesc}
                onChange={(val) => {
                  setShortDesc(val.target.value);
                }}
                label="Description"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              marginBlock: "20px",
            }}
          >
            <Button
              onClick={() => handleButtonClick()}
              variant="contained"
              endIcon={<Send />}
            >
              Update
            </Button>
          </div>
        </Container>
      </div>
    );
};
