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
        <Typography>Input shape: ({layerData.input_shape})</Typography>
        <Typography>Batch size: {layerData.batch_size}</Typography>
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
        <Typography>Activation: {layerData.activation}</Typography>
        <Typography>Units: {layerData.units}</Typography>
      </div>
    </Paper>
  );
};

const FlattenLayerVisualization = ({ title, id, layerData }) => {
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
        <Typography>Data format: {layerData.data_format}</Typography>
      </div>
    </Paper>
  );
};

const DropoutLayerVisualization = ({ title, id, layerData }) => {
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
        <Typography>Rate: {layerData.rate}</Typography>
      </div>
    </Paper>
  );
};

const Conv2DLayerVisualization = ({ title, id, layerData }) => {
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
        <Typography>Filters: {layerData.filters}</Typography>
        <Typography>Kernel size: {layerData.kernel_size}</Typography>
        <Typography>Strides: {layerData.strides}</Typography>
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
  else if (title === "Flatten") {
    return (
      <FlattenLayerVisualization title={title} id={id} layerData={layerData}/>
    );
  }
  else if (title === "Dropout") {
    return (
      <DropoutLayerVisualization title={title} id={id} layerData={layerData}/>
    );
  }
  else if (title === "Conv2D")
  {
    return (
      <Conv2DLayerVisualization title={title} id={id} layerData={layerData} />
    );
  }
};
