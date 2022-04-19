import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export const DeleteSuccess = () => {
  return (
    <div style={{ width: "100%" }}>
      <Alert
        variant="filled"
        severity="success"
        style={{ textAlign: "left", marginBlock: "50px", width: "100%" }}
      >
        <AlertTitle>Action success</AlertTitle>
        Entry deleted successfully.
      </Alert>
    </div>
  );
};
