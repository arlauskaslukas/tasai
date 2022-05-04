import React, {useEffect, useState} from "react";
import {Testimonial} from "../components/Testimonial";
import {Button, Container, Divider, Grid, Typography} from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie/es6";

export const ViewTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    const axiosCall = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/testimonials");
      let elements = res.data;
      console.log(elements);
      setTestimonials(elements);
    };
    axiosCall();
  }, []);
  return (
    <>
      <Container>
        <div style={{ display: "flex", paddingTop: "25px" }}>
          <Typography
            variant={"h3"}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Testimonial about our courses
          </Typography>
        </div>
        <div style={{ minHeight: "50vh", marginTop: "25px" }}>
          <Grid container spacing={2}>
            {testimonials.map((testimonial) => (
              <Grid item xs={4}>
                <Testimonial
                  user={testimonial.user.name}
                  testimonial={testimonial.testimonial}
                  rating={testimonial.rating}
                  course={testimonial.course.title}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Divider />
        {cookies.get("Authorization") === undefined ? (
          <></>
        ) : (
          <div style={{ marginBlock: "50px" }}>
            <Typography
              variant={"h4"}
              style={{
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "25px",
              }}
            >
              Want to add your testimonial?
            </Typography>
            <Button href={"/testimonials/new"} variant={"contained"}>
              Submit testimonial
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};
