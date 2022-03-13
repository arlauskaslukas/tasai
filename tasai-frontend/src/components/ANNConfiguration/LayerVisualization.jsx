import { Chip, Paper, Typography } from "@mui/material";
import React from "react";

const InputLayerVisualization = ({ title, id, layerData }) => {
  return (
    <Paper
      style={{
        background: "#d0d0d0",
        width: "60%",
        padding: "10px",
        marginBlock: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Chip label={title} variant={"outlined"} />
        <Typography>ID: {id}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Įvesties forma: ({layerData.input_shape})</Typography>
        <Typography>Paketo dydis: {layerData.batch_size}</Typography>
      </div>
    </Paper>
  );
};

const DenseLayerVisualization = ({ title, id, layerData }) => {
  return (
    <Paper
      style={{
        background: "#d0d0fd",
        width: "60%",
        padding: "10px",
        marginBlock: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Chip label={title} variant={"outlined"} />
        <Typography>ID: {id}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Aktyvacijos f-ja: {layerData.activation}</Typography>
        <Typography>Neuronų skaičius: {layerData.units}</Typography>
      </div>
    </Paper>
  );
};

export const LayerVisualization = ({ title, id, layerData }) => {
  if (title === "Input") {
    return (
      <InputLayerVisualization title={title} id={id} layerData={layerData} />
    );
  } else if (title === "Dense") {
    return (
      <DenseLayerVisualization title={title} id={id} layerData={layerData} />
    );
  }
};
