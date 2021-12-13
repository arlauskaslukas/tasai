import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export const Error = ({ title, subpoints = [] }) => {
  return (
    <div>
      <Alert
        variant="filled"
        severity="error"
        style={{ textAlign: "left", marginBlock: "20px" }}
      >
        <AlertTitle>{title}</AlertTitle>
        <ul>
          {subpoints.map((entry) => (
            <li>{entry}</li>
          ))}
        </ul>
      </Alert>
    </div>
  );
};
