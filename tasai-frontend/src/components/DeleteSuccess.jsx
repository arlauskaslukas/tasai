import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export const DeleteSuccess = () => {
  return (
    <div>
      <Alert
        variant="filled"
        severity="success"
        style={{ textAlign: "left", marginBlock: "50px" }}
      >
        <AlertTitle>Operacija sėkminga</AlertTitle>
        Įrašas sėkmingai ištrintas.
      </Alert>
    </div>
  );
};
