import {Checkbox, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, Typography,} from "@mui/material";
import React, {useEffect, useState} from "react";
import ModelHyperparametersEnums from "../../utils/ANNConfiguration/ModelHyperparametersEnums";
import FormControlLabel from "@mui/material/FormControlLabel";

export const ModelHyperparameters = ({ callback, disabled, initvals = {} }) => {
  const [optimizer, setOptimizer] = useState("Adam");
  const [lossFunction, setLossFunction] = useState("Binary Crossentropy");
  const [metrics, setMetrics] = useState([
    { id: 0, chosen: false, title: "fill" },
  ]);
  const [sendableMetrics, setSendableMetrics] = useState([]);
  const optimizers = ModelHyperparametersEnums.optimizers;
  const losses = ModelHyperparametersEnums.LossFunctions;
  const Metrics = ModelHyperparametersEnums.Metrics;
  const handleOptimizerChange = (event) => {
    setOptimizer(event.target.value);
    callback(event.target.value, lossFunction, sendableMetrics);
  };
  const handleLossFunctionChange = (event) => {
    setLossFunction(event.target.value);
    callback(optimizer, event.target.value, sendableMetrics);
  };
  const handleMetricCheck = (id) => {
    let mapped = metrics.map((metric) => {
      return metric.id == id
        ? { ...metric, chosen: !metric.chosen }
        : { ...metric };
    });
    console.log(mapped);
    setMetrics(mapped);
    let metricsForModel = mapped
      .filter((metric) => metric.chosen)
      .map((metric) => {
        return { name: metric.title };
      });
    setSendableMetrics(metricsForModel);
    callback(optimizer, lossFunction, metricsForModel);
  };
  useEffect(() => {
    let mappedMetrics = Metrics.map((metric, idx) => {
      return {
        id: idx,
        chosen: false,
        title: metric,
      };
    });
    if (disabled) {
      console.log(initvals);
      mappedMetrics = mappedMetrics.map((metric) => {
        let status = initvals.metrics.includes(metric);
        console.log(status);
        return {
          ...metric,
          chosen: status,
        };
      });
    }
    setMetrics(mappedMetrics);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="optimizer">Model optimizer</InputLabel>
        <Select
          disabled={disabled}
          labelId="optimizer"
          id="optimizer"
          value={optimizer}
          label="optimizer"
          onChange={handleOptimizerChange}
        >
          {optimizers.map((val) => (
            <MenuItem value={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBlock: "20px" }}>
        <InputLabel id="loss">Loss</InputLabel>
        <Select
          disabled={disabled}
          labelId="loss"
          id="loss"
          value={lossFunction}
          label="loss"
          onChange={handleLossFunctionChange}
        >
          {losses.map((val) => (
            <MenuItem value={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ marginBlock: "20px" }}>
        <Typography variant="h6">Choose model metrics</Typography>
        <FormGroup style={{ display: "flex", justifyContent: "left" }}>
          <Grid container spacing={2} style={{ paddingLeft: "10%" }}>
            {metrics.map((metric) => (
              <Grid
                item
                xs={12}
                md={6}
                style={{
                  display: "flex",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={disabled}
                      checked={metric.chosen}
                      onChange={() => handleMetricCheck(metric.id)}
                    />
                  }
                  label={metric.title}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </div>
    </div>
  );
};
