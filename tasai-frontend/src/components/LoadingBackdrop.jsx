import React from "react";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

export const LoadingBackdrop = ({ open }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
