import { ArrowBack, Send } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { width } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export const EditCourse = () => {
  const { id } = useParams();
  const url = `http://127.0.0.1:8000/api/courses/${id}`;
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [startDate, setStartDate] = useState("");
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
          <Button variant="contained" endIcon={<Send />}>
            Išsaugoti
          </Button>
        </div>
      </Container>
    </div>
  );
};
