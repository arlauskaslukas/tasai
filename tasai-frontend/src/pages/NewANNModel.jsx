import {
  AddCircleOutline,
  ArrowBack,
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
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { LoadingBackdrop } from "../components/LoadingBackdrop";
import { SnackbarSuccess } from "../components/SnackbarSuccess";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router";
import { add } from "lodash";

export const NewANNModel = ({ reviewing = false }) => {
  const layers = LayersEnums.Layers;
  const [newLayerDialogOpen, setNewLayerDialogOpen] = useState(false);
  const handleNewLayerDialogClose = () => setNewLayerDialogOpen(false);
  const handleNewLayerDialogOpen = () => setNewLayerDialogOpen(true);
  const [layerCategory, setLayerCategory] = useState(0);
  const [availableLayers, setAvailableLayers] = useState(layers[0].layers);
  const [addedLayers, setAddedLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState("");
  const [codeSnippetOpen, setCodeSnippetOpen] = useState(false);
  const [saveModelSuccess, setSaveModelSuccess] = useState(false);
  const dfs = new DataFetchService();

  let { id } = useParams();

  const [toggleLoading, setToggleLoading] = useState(false);

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

  const handleModelCodeGeneration = async () => {
    let res = await dfs.generateANNModel(
      modelHyperparams.optimizer,
      modelHyperparams.loss,
      modelHyperparams.metrics,
      layersHyperparams
    );
    setModelText(res.model);
    handleCodeSnippetOpen();
  };

  const handleSave = async () => {
    setToggleLoading(true);
    let response = await dfs.saveANNModel(
      "Luko test modelis",
      modelHyperparams.optimizer,
      modelHyperparams.loss,
      modelHyperparams.metrics,
      layersHyperparams
    );
    setToggleLoading(false);
    if (response.message === "ok") {
      setSaveModelSuccess(true);
    }
  };

  const handleCodeSnippetOpen = () => {
    setCodeSnippetOpen(!codeSnippetOpen);
  };

  const setHyperparams = (optimizerVal, lossVal, metrics) => {
    setModelHyperparams({
      ...modelHyperparams,
      optimizer: optimizerVal,
      loss: lossVal,
      metrics: metrics,
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
    if (reviewing) {
      dfs.getModel(id).then((result) => {
        setHyperparams(
          result.optimizer,
          result.loss,
          result.metrics.map((metric) => metric.name)
        );
        result.layers.map((layer) => {
          setAddedLayers((existingLayers) => [...existingLayers, layer.type]);
          setLayersHyperparams((existingLayers) => [
            ...existingLayers,
            {
              title: layer.type,
              id: addedLayers.length,
              hyperparameters: layer.hyperparameters,
            },
          ]);
        });
      });
      console.log(modelHyperparams);
    }
  }, []);

  const flattenObject = (kvp) => {
    let arr = [];
    for (const key in kvp) {
      arr.push(
        <Typography variant="body1">
          {key} - {kvp[key]}
        </Typography>
      );
      console.log(kvp[key]);
    }
    return arr;
  };

  return (
    <>
      <LoadingBackdrop open={toggleLoading} />
      <SnackbarSuccess
        open={saveModelSuccess}
        handleToggle={() => setSaveModelSuccess(!saveModelSuccess)}
        text={"A model has been saved successfully"}
      />
      <Dialog open={codeSnippetOpen}>
        <DialogTitle>{"Your generated code"}</DialogTitle>
        <DialogContent>
          <div style={{ overflow: "hidden", height: "100%", width: "100%" }}>
            <div
              style={{
                paddingRight: 17,
                height: "100%",
                width: "100%",
                boxSizing: "content-box",
                overflow: "scroll",
              }}
            >
              <CodeSnippet wrapText={true} type="multi" hideCopyButton={true}>
                {modelText === ""
                  ? "Generating model code..."
                  : modelText.toString()}
              </CodeSnippet>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleCodeSnippetOpen}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={newLayerDialogOpen}
        onClose={handleNewLayerDialogClose}
        style={{ minWidth: "50vw" }}
      >
        <DialogTitle>{"New layer"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginBlock: "20px" }}>
            <InputLabel id="layer-type">Layer type</InputLabel>
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
          <Button onClick={handleNewLayerDialogClose}>Cancel</Button>
          <Button
            startIcon={<AddCircleOutline />}
            variant="contained"
            autoFocus
            onClick={handleLayerAddition}
          >
            Add
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
              {reviewing ? (
                <>
                  <div style={{ display: "flex", padding: "20px" }}>
                    <Button
                      href="/admin/assignments/entries"
                      variant="contained"
                      startIcon={<ArrowBack />}
                    >
                      BACK TO ASSIGNMENT ENTRIES
                    </Button>
                  </div>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Model hyperparameters</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">
                          Optimizer: {modelHyperparams.optimizer}
                        </Typography>
                        <Typography variant="body1">
                          Loss function: {modelHyperparams.loss}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "left",
                        }}
                      >
                        <Typography variant="body1">Chosen metrics:</Typography>
                        {modelHyperparams.metrics.map((metric) => (
                          <Typography variant="body1">{metric}</Typography>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </>
              ) : (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Model hyperparameters</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ModelHyperparameters
                      disabled={reviewing}
                      initvals={modelHyperparams}
                      callback={setHyperparams}
                    />
                  </AccordionDetails>
                </Accordion>
              )}
              <Divider color="#000000" style={{ marginBlock: "20px" }} />

              {addedLayers.map((layer, idx) => (
                <>
                  {reviewing ? (
                    <></>
                  ) : (
                    <LayerHyperparameters
                      title={layer}
                      idx={idx}
                      disabled={reviewing}
                      parentUpdateFunc={changeHyperparamsVals}
                    />
                  )}
                </>
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
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  <Button
                    style={{ width: "100%", height: "100%" }}
                    onClick={handleNewLayerDialogOpen}
                    color="info"
                    variant="contained"
                    disabled={reviewing}
                    startIcon={<AddCircleOutline />}
                  >
                    New layer
                  </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Button
                    style={{ width: "100%", height: "100%" }}
                    color="success"
                    variant="contained"
                    disabled={reviewing}
                    onClick={handleModelCodeGeneration}
                    startIcon={<SendAndArchiveOutlined />}
                  >
                    Generate code
                  </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Button
                    style={{ width: "100%", height: "100%" }}
                    color="secondary"
                    variant="contained"
                    disabled
                    startIcon={<BugReport />}
                  >
                    Test the architecture
                  </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Button
                    style={{ width: "100%", height: "100%" }}
                    color="warning"
                    variant="contained"
                    disabled={reviewing}
                    startIcon={<Upload />}
                  >
                    Load ANN architecture
                  </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Button
                    style={{ width: "100%", height: "100%" }}
                    color="success"
                    variant="contained"
                    disabled={reviewing}
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                  >
                    Save ANN architecture
                  </Button>
                </Grid>
              </Grid>
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
                      Optimizer: {modelHyperparams.optimizer}
                    </Typography>
                    <Typography textAlign={"right"}>
                      Loss function: {modelHyperparams.loss}
                    </Typography>
                  </div>
                </div>

                <Typography>Added layers:</Typography>
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
