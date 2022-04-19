import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export const LayerSelection = ({ children, value, index, selectLayerFunc }) => {
  const [layer, setLayer] = useState(children[0]);
  const handleLayerChange = (event) => {
    setLayer(event.target.value);
    selectLayerFunc(event.target.value);
  };
  return (
    <div hidden={value !== index}>
      {value === index && (
        <FormControl fullWidth style={{ marginBlock: "20px" }}>
          <InputLabel id="layer">Layer</InputLabel>
          <Select
            labelId="layer"
            id="layer"
            value={layer}
            label="loss"
            onChange={handleLayerChange}
          >
            {children.map((val) => (
              <MenuItem value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};
