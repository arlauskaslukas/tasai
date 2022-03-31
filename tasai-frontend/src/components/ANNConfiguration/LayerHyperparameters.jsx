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
import _, { update } from "lodash";

function LayerHyperparametersDistributor(title, updateFunction) {
  if (title === "Input") {
    return <InputLayerHyperparameters updateFunction={updateFunction} />;
  } else if (title === "Dense") {
    return <DenseLayerHyperparameters updateFunction={updateFunction} />;
  } else if (title === "Flatten") {
    return <FlattenLayerHyperparameters updateFunction={updateFunction}/>;
  } else if (title === "Dropout") {
    return <DropoutLayerHyperparameters updateFunction={updateFunction}/>
  } else if (title === "Conv2D") {
    return <Conv2DLayerHyperparameters updateFunction={updateFunction}/>
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

const FlattenLayerHyperparameters = ({ updateFunction }) => {
  const DataFormats = ['channels_first', 'channels_last'];
  const [dataFormat, setDataFormat] = useState("channels_last");
  const handleDataFormatChange = (event) => {
    setDataFormat(event.target.value);
    updateFunction({ data_format: event.target.value });
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
      <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="data_format">Duomenų formatas</InputLabel>
        <Select
          labelId="data_format"
          id="data_format"
          value={dataFormat}
          label="data_format"
          onChange={handleDataFormatChange}
        >
          {DataFormats.map((val) => (
            <MenuItem value={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

const DropoutLayerHyperparameters = ({ updateFunction }) => {
  const [rate, setRate] = useState(0.1);
  const num_regex = new RegExp("([0](\\.[1-9]*){0,1})|(1)");
  const handleRateChange = (event) => {
    if(event.target.value === "")
    {
      setRate("");
      updateFunction({rate: "None"})
    } else if(!num_regex.test(event.target.value))
    {
      setRate(0);
      updateFunction({rate: 0});
    } else if(event.target.value > 1)
    {
      setRate(1);
      updateFunction({ rate: 1 });  
    } else if(event.target.value < 0)
    {
      setRate(0);
      updateFunction({rate: 0});
    }
    else
    {
      setRate(event.target.value);
      updateFunction({rate: event.target.value})
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
        <Button color="warning" variant="contained" startIcon={<Delete />}>
          Ištrinti sluoksnį
        </Button>
      </div>
      <TextField value={rate} required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Dažnis"}
        inputMode={"numeric"}
        onChange={handleRateChange}
        variant="outlined"/>
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

const Conv2DLayerHyperparameters = ({ updateFunction }) => {
  const Paddings = ["same", "valid"];
  const [filters, setFilters] = useState(2);
  const [kernelSize, setKernelSize] = useState("(2,2)");
  const [strides, setStrides] = useState("2");
  const [padding, setPadding] = useState("valid");
  const activations = LayersEnums.Activations;
  const [activation, setActivation] = useState("");

  const handleFiltersChange = event => {
    setFilters(event.target.value);
    updateFunction({filters: event.target.value, kernel_size: kernelSize, strides: strides, padding: padding, activation: activation});
  }

  const handleKernelSizeChange = event => {
    setKernelSize(event.target.value);
    updateFunction({filters: filters, kernel_size: event.target.value, strides: strides, padding: padding, activation: activation});
  }

  const handleStridesChange = event => {
    setStrides(event.target.value);
    updateFunction({filters: filters, kernel_size: kernelSize, strides: event.target.value, padding: padding, activation: activation});
  }

  const handlePaddingChange = event => {
    setPadding(event.target.value);
    updateFunction({filters: filters, kernel_size: kernelSize, strides: strides, padding: event.target.value, activation: activation});
  }

  const handleActivationChange = event => {
    setActivation(event.target.value);
    updateFunction({filters: filters, kernel_size: kernelSize, strides: strides, padding: padding, activation: event.target.value});
  }
  
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
      <TextField value={filters} required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Filtrų skaičius"}
        inputMode={"numeric"}
        onChange={handleFiltersChange}
        variant="outlined"/>
        <TextField value={kernelSize} required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Konvoliucijos lango dydis"}
        onChange={handleKernelSizeChange}
        variant="outlined"/>
        <TextField value={strides} required
        fullWidth
        style={{ marginBlock: "20px" }}
        label={"Žingsnio dydis"}
        onChange={handleStridesChange}
        variant="outlined"/>
        <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="padding">Apkarpymas</InputLabel>
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
