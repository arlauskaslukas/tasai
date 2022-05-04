import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/es6";
import {
    Button,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Rating,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import AxiosClient from "../utils/AxiosClient";
import {Error} from "../components/Error";
import {SuccessAlert} from "../components/SuccessAlert";
import _ from "lodash";

export const NewTestimonial = () => {
  const [course, setCourse] = useState(0);
  const [rating, setRating] = useState(0);
  const [testimonial, setTestimonial] = useState("");
  const [courses, setCourses] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const cookies = new Cookies();

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const getCourses = async () => {
    let res = await AxiosClient.get("http://127.0.0.1:8000/api/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const Validate = () => {
    let isDataValid = true;
    let num_regex = new RegExp("[1-9][0-9]*");
    setErrors([]);

    if (!_.isString(testimonial) || _.isEqual(testimonial, "")) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Testimonial field is mandatory"]);
    }
    if (_.isEqual(course, 0)) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Course selection is mandatory"]);
    }
    if (_.isEqual(rating, 0)) {
      isDataValid = false;
      setErrors((errs) => [...errs, "Rating must be in interval from 1 to 5"]);
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
    await AxiosClient.post("http://127.0.0.1:8000/api/testimonials", {
      testimonial: testimonial,
      rating: rating,
      course_id: Number(course),
    });
  };

  if (cookies.get("Authorization") === undefined) {
    return <></>;
  } else if (courses === undefined) {
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
              NEW TESTIMONIAL
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
                href="/testimonials"
                style={{ backgroundColor: "#B7094C " }}
              >
                Back
              </Button>
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
            <div>
              <Paper elevation={2} style={{ padding: "25px" }}>
                <Grid container spacing={2} style={{ paddingBlock: "20px" }}>
                  <Grid item xs={12} md={8}>
                    <FormControl fullWidth>
                      <InputLabel id="course-label">Course</InputLabel>
                      <Select
                        labelId="course-label"
                        id="course-select"
                        value={course}
                        label="course_id"
                        onChange={handleChange}
                      >
                        {courses.map((courseSelect) => (
                          <MenuItem value={courseSelect.id}>
                            {courseSelect.id} - {courseSelect.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography component={"legend"}>Course rating</Typography>
                    <Rating
                      value={rating}
                      onChange={(event, newVal) => setRating(newVal)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      value={testimonial}
                      onChange={(event) => setTestimonial(event.target.value)}
                      multiline
                      rows={4}
                    />
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
                    Send testimonial
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
        </Container>
      </>
    );
};
