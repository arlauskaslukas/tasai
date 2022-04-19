import { ArrowBack, Send } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
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
import { width } from "@mui/system";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AxiosClient from "../utils/AxiosClient";
import { Error } from "../components/Error";
import { SuccessAlert } from "../components/SuccessAlert";

export const NewTopic = () => {
  const [courseData, setCourseData] = useState(undefined);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [theory, setTheory] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [course_id, setCourse_id] = useState(0);
  const [impliedOrder, setImpliedOrder] = useState(0);

  const handleChange = (event) => {
    getImpliedOrder(event.target.value);
    setCourse_id(event.target.value);
  };

  const handleButtonClick = async () => {
    setSuccess(false);
    if (Validate()) {
      let res = await SendToDB();
      setSuccess(true);
    }
  };

  const getImpliedOrder = async (value) => {
    let res = await AxiosClient.post(
      "http://127.0.0.1:8000/api/getlasttopicorder",
      {
        id: value,
      }
    );
    setImpliedOrder(res.data + 1);
  };

  const axiosCall = async () => {
    let res = await AxiosClient.get("http://127.0.0.1:8000/api/courses");
    setCourseData(res.data);
  };

  const SendToDB = async () => {
    console.log({ title, impliedOrder, course_id, shortDesc, theory });
    AxiosClient.post("http://127.0.0.1:8000/api/topics", {
      title: title,
      short_description: shortDesc,
      theory: theory,
      course_id: Number(course_id),
      topic_order: Number(impliedOrder),
    });
  };

  useEffect(() => {
    axiosCall();
  }, []);

  const Validate = () => {
    let isDataValid = true;
    let num_regex = new RegExp("[1-9][0-9]*");
    setErrors([]);

    if (!_.isString(title) || _.isEqual(title, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Topic title is mandatory"]);
    }
    if (!_.isString(shortDesc) || _.isEqual(shortDesc, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Topic short description is mandatory"]);
    }
    if (!_.isString(theory) || _.isEqual(theory, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Topic theory is mandatory"]);
    }
    if (_.isEqual(course_id, 0)) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Course selection is mandatory"]);
    }
    return isDataValid;
  };
  if (courseData === undefined) {
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
              NEW TOPIC
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
                href="/admin/topics"
                style={{ backgroundColor: "#B7094C" }}
              >
                Back
              </Button>
            </div>
          </div>
          {errors.length === 0 ? (
            <></>
          ) : (
            <Error title={"Klaida įvedant duomenis"} subpoints={errors} />
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
                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={course_id}
                  label="course_id"
                  onChange={handleChange}
                >
                  {courseData.map((course) => (
                    <MenuItem value={course.id}>
                      {course.id} - {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                disabled
                fullWidth
                label={"Topic order"}
                variant={"outlined"}
                value={impliedOrder}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                label="Topic title"
                required
                value={title}
                onChange={(val) => {
                  setTitle(val.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                rows={2}
                value={shortDesc}
                onChange={(val) => {
                  setShortDesc(val.target.value);
                }}
                label="Short description"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                rows={20}
                value={theory}
                onChange={(val) => {
                  setTheory(val.target.value);
                }}
                label="Long description"
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
              Save
            </Button>
          </div>
        </Container>
      </div>
    );
};
