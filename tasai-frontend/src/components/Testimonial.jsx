import React from "react";
import { Paper, Rating, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const Testimonial = ({ rating, testimonial, user, course }) => {
  return (
    <>
      <Paper style={{ marginBlock: "20px", padding: "20px" }} elevation={2}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <PersonIcon style={{ height: "100%" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
              }}
            >
              <Typography variant={"h5"} align={"left"}>
                {user}
              </Typography>
              <Typography variant={"body1"} fontWeight={"bold"} align={"left"}>
                {course}
              </Typography>
            </div>

            <Rating value={rating} readOnly />
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Typography textAlign={"left"} variant={"body1"}>
              {testimonial}
            </Typography>
          </div>
        </div>
      </Paper>
    </>
  );
};
