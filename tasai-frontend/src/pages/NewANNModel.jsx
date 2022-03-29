import {
  AddCircleOutline,
  BugReport,
  ExpandMore,
  SendAndArchiveOutlined,
  Upload,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  FormControl,
  InputLabel,
  AccordionSummary,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { LayerHyperparameters } from "../components/ANNConfiguration/LayerHyperparameters";
import { LayerSelection } from "../components/ANNConfiguration/LayerSelection";
import { LayerVisualization } from "../components/ANNConfiguration/LayerVisualization";
import { ModelHyperparameters } from "../components/ANNConfiguration/ModelHyperparameters";
import LayersEnums from "../utils/ANNConfiguration/LayersEnums";
import CodeSnippet from "../../node_modules/carbon-components-react/es/components/CodeSnippet/CodeSnippet";
import DataFetchService from "../services/DataFetchService";

export const NewANNModel = () => {
  const layers = LayersEnums.Layers;
  const [newLayerDialogOpen, setNewLayerDialogOpen] = useState(false);
  const handleNewLayerDialogClose = () => setNewLayerDialogOpen(false);
  const handleNewLayerDialogOpen = () => setNewLayerDialogOpen(true);
  const [layerCategory, setLayerCategory] = useState(0);
  const [availableLayers, setAvailableLayers] = useState(layers[0].layers);
  const [addedLayers, setAddedLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState("");
  const [codeSnippetOpen, setCodeSnippetOpen] = useState(false);
  const dfs = new DataFetchService();
  const [modelHyperparams, setModelHyperparams] = useState({
    optimizer: "Adam",
    loss: "Binary Crossentropy",
    metrics: [],
  });
  const [layersHyperparams, setLayersHyperparams] = useState([]);
  const [modelText, setModelText] = useState("");

  const changeHyperparamsVals = (idx, params) => {
    let mapped = layersHyperparams.map((layer) => {
      return layer.id === idx
        ? { ...layer, hyperparameters: { ...params } }
        : { ...layer };
    });
    console.log(mapped);
    setLayersHyperparams(mapped);
  };

  const handleModelCodeGeneration = () => {
    let res = await dfs.generateANNModel(
      modelHyperparams.optimizer,
      modelHyperparams.loss,
      modelHyperparams.metrics,
      layersHyperparams
    );
    setModelText()
  };

  const setHyperparams = (optimizerVal, lossVal) => {
    setModelHyperparams({
      ...modelHyperparams,
      optimizer: optimizerVal,
      loss: lossVal,
    });
  };

  const handleCategoryChange = (event) => {
    setLayerCategory(event.target.value);
    changeAvailableLayers(event.target.value);
  };
  const handleLayerAddition = () => {
    setAddedLayers((layers) => [...layers, selectedLayer]);
    setLayersHyperparams((layers) => [
      ...layers,
      { title: selectedLayer, id: addedLayers.length, hyperparameters: {} },
    ]);
  };
  const changeAvailableLayers = (cat) => {
    let res = layers.filter((layerType) => layerType.layerCatId === cat)[0];
    setAvailableLayers(res.layers);
    setSelectedLayer(res.layers[0]);
  };
  useEffect(() => {
    changeAvailableLayers(layerCategory);
  }, []);

  return (
    <>
      <Dialog open={false}>
        <DialogTitle>{"Jūsų sugeneruotas kodas"}</DialogTitle>
        <DialogContent>
          <CodeSnippet type="multi" hideCopyButton={true}>
            Inserting tensorflow code here
          </CodeSnippet>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        open={newLayerDialogOpen}
        onClose={handleNewLayerDialogClose}
        style={{ minWidth: "50vw" }}
      >
        <DialogTitle>{"Naujo sluoksnio pridėjimas"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginBlock: "20px" }}>
            <InputLabel id="layer-type">Sluoksnio tipas</InputLabel>
            <Select
              labelId="layer-type"
              id="layer-type-select"
              value={layerCategory}
              onChange={handleCategoryChange}
            >
              {layers.map((layerType) => (
                <MenuItem value={layerType.layerCatId}>
                  {layerType.layerCat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBlock: "20px" }}>
            <InputLabel id="layer">Sluoksnis</InputLabel>
            <Select
              labelId="layer"
              id="layer-select"
              value={selectedLayer}
              onChange={(event) => setSelectedLayer(event.target.value)}
            >
              {availableLayers.map((layer) => (
                <MenuItem value={layer}>{layer}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewLayerDialogClose}>Atšaukti</Button>
          <Button
            startIcon={<AddCircleOutline />}
            variant="contained"
            autoFocus
            onClick={handleLayerAddition}
          >
            Pridėti
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ minHeight: "100vh", display: "flex" }}>
        <Grid container spacing={2} style={{ minHeight: "100%" }}>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={2}
              style={{
                backgroundColor: "#dfdfdf",
                height: "100vh",
                overflowY: "scroll",
                paddingTop: "20px",
              }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Modelio hiperparametrai</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ModelHyperparameters callback={setHyperparams} />
                </AccordionDetails>
              </Accordion>
              <Divider color="#000000" style={{ marginBlock: "20px" }} />
              {addedLayers.map((layer, idx) => (
                <LayerHyperparameters
                  title={layer}
                  idx={idx}
                  parentUpdateFunc={changeHyperparamsVals}
                />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                paddingTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={handleNewLayerDialogOpen}
                  color="info"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                >
                  Naujas modelio sluoksnis
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  color="success"
                  variant="contained"
                  startIcon={<SendAndArchiveOutlined />}
                >
                  Generuoti kodą
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  color="secondary"
                  variant="contained"
                  disabled
                  startIcon={<BugReport />}
                >
                  Testuoti architektūrą
                </Button>
                <Button
                  style={{ marginInline: "20px" }}
                  color="warning"
                  variant="contained"
                  startIcon={<Upload />}
                >
                  Įkelti DNT architektūrą
                </Button>
              </div>
              <Paper
                elevation={2}
                style={{
                  flexGrow: 1,
                  overflowY: "scroll",
                  backgroundColor: "#f0f0f0",
                  marginBlock: "20px",
                  marginLeft: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography textAlign={"right"}>
                      Modelio pasirinktas optimizatorius:{" "}
                      {modelHyperparams.optimizer}
                    </Typography>
                    <Typography textAlign={"right"}>
                      Modelio pasirinkta netekties funkcija:{" "}
                      {modelHyperparams.loss}
                    </Typography>
                  </div>
                </div>

                <Typography>Prideti sluoksniai:</Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {layersHyperparams.map((layer) => (
                    <LayerVisualization
                      title={layer.title}
                      id={layer.id}
                      layerData={layer.hyperparameters}
                    />
                  ))}
                </div>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
