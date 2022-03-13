import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { flexbox } from "@mui/system";
import React, { useState } from "react";
import LayersEnums from "../../utils/ANNConfiguration/LayersEnums";

function LayerHyperparametersDistributor(title, updateFunction) {
  if (title === "Input") {
    return <InputLayerHyperparameters updateFunction={updateFunction} />;
  } else if (title === "Dense") {
    return <DenseLayerHyperparameters updateFunction={updateFunction} />;
  }
}

const InputLayerHyperparameters = ({ updateFunction }) => {
  const [inputShape, setInputShape] = useState("");
  const [batchSize, setBatchSize] = useState(0);
  const handleInputShapeChange = (event) => {
    setInputShape(event.target.value);
    updateFunction({ input_shape: event.target.value, batch_size: batchSize });
  };
  const handleBatchSizeChange = (event) => {
    setBatchSize(event.target.value);
    updateFunction({ input_shape: inputShape, batch_size: event.target.value });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <Button color="warning" variant="contained" startIcon={<Delete />}>
          Ištrinti sluoksnį
        </Button>
      </div>
      <TextField
        required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Įvesties forma"}
        value={inputShape}
        onChange={handleInputShapeChange}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Paketo dydis (batch size)"
        value={batchSize}
        onChange={handleBatchSizeChange}
        variant="outlined"
      />
    </>
  );
};

const DenseLayerHyperparameters = ({ updateFunction }) => {
  const activations = LayersEnums.Activations;
  const [activation, setActivation] = useState("");
  const [units, setUnits] = useState(2);
  const handleActivationChange = (event) => {
    setActivation(event.target.value);
    updateFunction({ activation: event.target.value, units: units });
  };
  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
    updateFunction({ activation: activation, units: event.target.value });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <Button color="warning" variant="contained" startIcon={<Delete />}>
          Ištrinti sluoksnį
        </Button>
      </div>
      <TextField
        required
        fullWidth
        label={"Neuronų skaičius sluoksnyje"}
        value={units}
        onChange={handleUnitsChange}
        variant={"outlined"}
      />
      <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="loss">Aktyvacija</InputLabel>
        <Select
          labelId="activation"
          id="activation"
          value={activation}
          label="activation"
          onChange={handleActivationChange}
        >
          <MenuItem value={""}>Linear</MenuItem>
          {activations.map((val) => (
            <MenuItem value={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export const LayerHyperparameters = ({ title, idx, parentUpdateFunc }) => {
  const updateFunction = (params) => {
    parentUpdateFunc(idx, params);
  };
  return (
    <div>
      <Accordion style={{ marginBlock: "20px" }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            Sluoksnio nr. {idx} - {title} hiperparametrai
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {LayerHyperparametersDistributor(title, updateFunction)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
