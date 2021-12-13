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

export const CreateAssignment = () => {
  const [topicData, setTopicData] = useState(undefined);
  const [topic_id, setTopic_id] = useState(0);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
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

  const axiosCall = async () => {
    const res = await AxiosClient.get("http://127.0.0.1:8000/api/topics");
    let elements = res.data;
    console.log(elements);
    setTopicData(elements);
  };
  useEffect(() => {
    axiosCall();
  }, []);

  const SendToDB = async () => {
    console.log({ title, duration, cost, shortDesc, longDesc });
    AxiosClient.post("http://127.0.0.1:8000/api/courses", {
      title: title,
      duration: duration,
      description: shortDesc,
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
    if (_.isEqual(deadline, "")) {
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
              KURTI NAUJĄ ATSISKAITYMĄ
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
                <InputLabel id="demo-simple-select-label">Tema</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={topic_id}
                  label="topic_id"
                  onChange={handleChange}
                >
                  {topicData.map((topic) => (
                    <MenuItem value={topic.id}>
                      {topic.id} - {topic.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                label="Atsiskaitymo pavadinimas"
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
                label="Atsiskaitymo pateikimo data"
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
                label="Trumpas aprašymas"
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
