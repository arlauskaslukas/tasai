import { ArrowBack, Send } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import AxiosClient from "../utils/AxiosClient";
import { Error } from "../components/Error";
import { SuccessAlert } from "../components/SuccessAlert";
import _ from "lodash";

export const EditCourse = () => {
  const { id } = useParams();
  const url = `http://127.0.0.1:8000/api/courses/${id}`;
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = async () => {
    setSuccess(false);
    if (Validate()) {
      let res = await SendToDB();
      setSuccess(true);
    }
  };

  const SendToDB = async () => {
    console.log({ title, duration, cost, shortDesc, longDesc });
    await AxiosClient.put("http://127.0.0.1:8000/api/courses", {
      id: Number(id),
      starts_at: moment(startDate).format("YYYY-MM-DD"),
      title: title,
      duration: duration,
      short_description: shortDesc,
      long_description: longDesc,
      cost: cost,
    });
  };

  const Validate = () => {
    let isDataValid = true;
    let num_regex = new RegExp("[1-9][0-9]*");
    setErrors([]);

    if (!_.isString(title) || _.isEqual(title, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Course title is a mandatory field"]);
    }
    if (!_.isString(shortDesc) || _.isEqual(shortDesc, "")) {
      isDataValid = false;
      setErrors((errs) => [
        ...errs,
        "Course short description is a mandatory field",
      ]);
    }
    if (!_.isString(longDesc) || _.isEqual(longDesc, "")) {
      isDataValid = false;
      setErrors((errs) => [
        ...errs,
        "Course long description is a mandatory field",
      ]);
    }
    if (_.isEqual(startDate, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Course start date is a mandatory field"]);
    }
    if (!num_regex.test(duration)) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Course duration is a mandatory field"]);
    }
    if (cost < 0.0) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Course price cannot be less than zero"]);
    }
    return isDataValid;
  };

  useEffect(() => {
    const axiosCall = async () => {
      const res = await axios.get(url);
      console.log(res.data);
      setTitle(res.data.title);
      setDuration(res.data.duration);
      setCost(res.data.cost);
      setShortDesc(res.data.short_description);
      setLongDesc(res.data.long_description);
      setStartDate(res.data.starts_at);
    };
    axiosCall();
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Container>
        <div style={{ paddingTop: "20px" }}>
          <Typography
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
            }}
            textAlign={"start"}
            variant="h4"
          >
            UPDATE COURSE INFORMATION
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
              href="/admin/courses"
              style={{ backgroundColor: "#B7094C " }}
            >
              Back
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
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              label="Course title"
              required
              value={title}
              onChange={(val) => {
                setTitle(val.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              label="Course duration in weeks"
              required
              value={duration}
              onChange={(val) => {
                setDuration(val.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              disablePast
              required
              label="Course start date"
              value={startDate}
              onChange={(val) => {
                setStartDate(val);
              }}
              renderInput={(params) => (
                <TextField {...params} required style={{ width: "100%" }} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              required
              value={cost}
              onChange={(val) => {
                setCost(val.target.value);
              }}
              label="Course price"
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
              rows={4}
              value={longDesc}
              onChange={(val) => {
                setLongDesc(val.target.value);
              }}
              label="Longer description"
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
