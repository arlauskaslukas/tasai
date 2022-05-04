import React from "react";
import {Alert, AlertTitle} from "@mui/material";

export const SuccessAlert = () => {
  return (
    <div>
      <Alert
        severity="success"
        style={{ textAlign: "left", marginBlock: "50px" }}
      >
        <AlertTitle>Action success</AlertTitle>
        Action has been successfully sent to DB.
      </Alert>
    </div>
  );
};
