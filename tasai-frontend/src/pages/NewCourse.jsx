import { ArrowBack, Send } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { width } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";

export const NewCourse = () => {
  const [startDate, setStartDate] = useState("");
  return (
    <div>
      <Container>
        <div>
          <Typography textAlign={"start"} variant="h4">
            PRIDĖTI NAUJĄ KURSĄ
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
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              label="Kurso trukmė"
              required
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
              label="Kurso kaina"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              multiline
              rows={2}
              label="Trumpas aprašymas"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              multiline
              rows={4}
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
            Save
          </Button>
        </div>
      </Container>
    </div>
  );
};
