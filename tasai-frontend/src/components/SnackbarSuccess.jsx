import {Alert, Snackbar} from "@mui/material";
import React from "react";

export const SnackbarSuccess = ({ open, handleToggle, text }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleToggle}>
      <Alert onClose={handleToggle} severity="success" sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};
