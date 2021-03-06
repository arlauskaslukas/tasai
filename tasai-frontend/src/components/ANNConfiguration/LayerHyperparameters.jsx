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
import React, { useEffect, useState } from "react";
import LayersEnums from "../../utils/ANNConfiguration/LayersEnums";

function LayerHyperparametersDistributor(title, updateFunction, onDelete) {
  if (title === "Input") {
    return (
      <InputLayerHyperparameters
        updateFunction={updateFunction}
        onDelete={onDelete}
      />
    );
  } else if (title === "Dense") {
    return (
      <DenseLayerHyperparameters
        updateFunction={updateFunction}
        onDelete={onDelete}
      />
    );
  } else if (title === "Flatten") {
    return (
      <FlattenLayerHyperparameters
        updateFunction={updateFunction}
        onDelete={onDelete}
      />
    );
  } else if (title === "Dropout") {
    return (
      <DropoutLayerHyperparameters
        updateFunction={updateFunction}
        onDelete={onDelete}
      />
    );
  } else if (title === "Conv2D") {
    return (
      <Conv2DLayerHyperparameters
        updateFunction={updateFunction}
        onDelete={onDelete}
      />
    );
  }
}

const InputLayerHyperparameters = ({ updateFunction, onDelete }) => {
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
        <Button
          color="warning"
          onClick={() => onDelete()}
          variant="contained"
          startIcon={<Delete />}
        >
          Delete Layer
        </Button>
      </div>
      <TextField
        required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Input shape"}
        value={inputShape}
        onChange={handleInputShapeChange}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Batch size"
        value={batchSize}
        onChange={handleBatchSizeChange}
        variant="outlined"
      />
    </>
  );
};

const DenseLayerHyperparameters = ({ updateFunction, onDelete }) => {
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
        <Button
          color="warning"
          onClick={() => onDelete()}
          variant="contained"
          startIcon={<Delete />}
        >
          Delete Layer
        </Button>
      </div>
      <TextField
        required
        fullWidth
        label={"Units"}
        value={units}
        onChange={handleUnitsChange}
        variant={"outlined"}
      />
      <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="loss">Activation</InputLabel>
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

const FlattenLayerHyperparameters = ({ updateFunction, onDelete }) => {
  const [inputShape, setInputShape] = useState("(28,28)");
  const handleInputShapeChange = (event) => {
    setInputShape(event.target.value);
    updateFunction({ input_shape: event.target.value });
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
        <Button
          color="warning"
          onClick={() => onDelete()}
          variant="contained"
          startIcon={<Delete />}
        >
          Delete Layer
        </Button>
      </div>
      <TextField
        required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Input shape"}
        value={inputShape}
        onChange={handleInputShapeChange}
        variant="outlined"
      />
    </>
  );
};

const DropoutLayerHyperparameters = ({ updateFunction, onDelete }) => {
  const [rate, setRate] = useState(0.1);
  const num_regex = new RegExp("([0](\\.[1-9]*){0,1})|(1)");
  const handleRateChange = (event) => {
    if (event.target.value === "") {
      setRate("");
      updateFunction({ rate: "None" });
    } else if (!num_regex.test(event.target.value)) {
      setRate(0);
      updateFunction({ rate: 0 });
    } else if (event.target.value > 1) {
      setRate(1);
      updateFunction({ rate: 1 });
    } else if (event.target.value < 0) {
      setRate(0);
      updateFunction({ rate: 0 });
    } else {
      setRate(event.target.value);
      updateFunction({ rate: event.target.value });
    }
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
        <Button
          color="warning"
          onClick={() => onDelete()}
          variant="contained"
          startIcon={<Delete />}
        >
          Delete Layer
        </Button>
      </div>
      <TextField
        value={rate}
        required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Rate"}
        inputMode={"numeric"}
        onChange={handleRateChange}
        variant="outlined"
      />
    </>
  );
};

export const LayerHyperparameters = ({
  title,
  idx,
  parentUpdateFunc,
  onDelete,
}) => {
  const updateFunction = (params) => {
    parentUpdateFunc(idx, params);
  };
  const deleteLayer = () => {
    onDelete(idx);
  };
  return (
    <div>
      <Accordion style={{ marginBlock: "20px" }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            Layer {idx} - {title} hyperparameters
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {LayerHyperparametersDistributor(title, updateFunction, deleteLayer)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const Conv2DLayerHyperparameters = ({ updateFunction, onDelete }) => {
  const Paddings = ["same", "valid"];
  const [filters, setFilters] = useState(2);
  const [kernelSize, setKernelSize] = useState("(2,2)");
  const [strides, setStrides] = useState("2");
  const [padding, setPadding] = useState("valid");
  const activations = LayersEnums.Activations;
  const [activation, setActivation] = useState("");

  const handleFiltersChange = (event) => {
    setFilters(event.target.value);
    updateFunction({
      filters: event.target.value,
      kernel_size: kernelSize,
      strides: strides,
      padding: padding,
      activation: activation,
    });
  };

  const handleKernelSizeChange = (event) => {
    setKernelSize(event.target.value);
    updateFunction({
      filters: filters,
      kernel_size: event.target.value,
      strides: strides,
      padding: padding,
      activation: activation,
    });
  };

  const handleStridesChange = (event) => {
    setStrides(event.target.value);
    updateFunction({
      filters: filters,
      kernel_size: kernelSize,
      strides: event.target.value,
      padding: padding,
      activation: activation,
    });
  };

  const handlePaddingChange = (event) => {
    setPadding(event.target.value);
    updateFunction({
      filters: filters,
      kernel_size: kernelSize,
      strides: strides,
      padding: event.target.value,
      activation: activation,
    });
  };

  const handleActivationChange = (event) => {
    setActivation(event.target.value);
    updateFunction({
      filters: filters,
      kernel_size: kernelSize,
      strides: strides,
      padding: padding,
      activation: event.target.value,
    });
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
        <Button
          color="warning"
          onClick={() => onDelete()}
          variant="contained"
          startIcon={<Delete />}
        >
          Delete Layer
        </Button>
      </div>
      <TextField
        value={filters}
        required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Filters"}
        inputMode={"numeric"}
        onChange={handleFiltersChange}
        variant="outlined"
      />
      <TextField
        value={kernelSize}
        required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Kernel size"}
        onChange={handleKernelSizeChange}
        variant="outlined"
      />
      <TextField
        value={strides}
        required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Stride"}
        onChange={handleStridesChange}
        variant="outlined"
      />
      <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="padding">Padding</InputLabel>
        <Select
          labelId="padding"
          id="padding"
          value={padding}
          label="padding"
          onChange={handlePaddingChange}
        >
          {Paddings.map((val) => (
            <MenuItem value={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="loss">Activation</InputLabel>
        <Select
          labelId="activation"
          id="activation"
          value={activation}
          label="activation"
          onChange={handleActivationChange}
        >
          <MenuItem value={"Linear"}>Linear</MenuItem>
          {activations.map((val) => (
            <MenuItem value={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
