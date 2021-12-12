import { ArrowBack, Send } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { width } from "@mui/system";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import AxiosClient from "../utils/AxiosClient";
import { Error } from "../components/Error";

export const NewCourse = () => {
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
    console.log({ title, duration, cost, shortDesc, longDesc, startDate });
    AxiosClient.post("http://127.0.0.1:8000/api/", {
      starts_at: startDate,
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
      setErrors((errs) => [...errs, "Kurso pavadinimas privalomas"]);
    }
    if (!_.isString(shortDesc) || _.isEqual(shortDesc, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Kurso trumpas aprašymas privalomas"]);
    }
    if (!_.isString(longDesc) || _.isEqual(longDesc, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Kurso trumpas aprašymas privalomas"]);
    }
    if (_.isEqual(startDate, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Kurso pradžios datos laukas privalomas"]);
    }
    if (!num_regex.test(duration)) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Kurso trukmės laukas privalomas"]);
    }
    if (cost < 0.0) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Kurso kaina negali būti neigiama"]);
    }
    return isDataValid;
  };

  return (
    <div>
      <Container>
        <div>
          <Typography textAlign={"start"} variant="h4">
            REDAGUOTI KURSĄ
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
              Atgal
            </Button>
          </div>
        </div>
        {errors.length === 0 ? (
          <></>
        ) : (
          <Error title={"Klaida įvedant duomenis"} subpoints={errors} />
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              label="Kurso pavadinimas"
              required
              value={title}
              onChange={(val) => {
                setTitle(val);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              label="Kurso trukmė"
              required
              value={duration}
              onChange={(val) => {
                setDuration(val);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              disablePast
              required
              label="Kurso pradžia"
              value={startDate}
              onChange={(newVal) => {
                setStartDate(newVal);
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
                setCost(val);
              }}
              label="Kurso kaina"
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
                setShortDesc(val);
              }}
              label="Trumpas aprašymas"
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
                setLongDesc(val);
              }}
              label="Ilgas aprašymas"
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
            Išsaugoti
          </Button>
        </div>
      </Container>
    </div>
  );
};
