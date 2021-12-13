import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export const SuccessAlert = () => {
  return (
    <div>
      <Alert
        variant="filled"
        severity="success"
        style={{ textAlign: "left", marginBlock: "50px" }}
      >
        <AlertTitle>Operacija sėkminga</AlertTitle>
        Jūsų duomenys buvo sėkmingai nusiųsti į duomenų bazę.
      </Alert>
    </div>
  );
};
