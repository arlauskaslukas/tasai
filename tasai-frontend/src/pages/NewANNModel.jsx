import {
  AddCircleOutline,
  ArrowBack,
  BugReport,
  ExpandMore,
  SendAndArchiveOutlined,
  Upload,
  Visibility,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { LayerHyperparameters } from "../components/ANNConfiguration/LayerHyperparameters";
import { LayerVisualization } from "../components/ANNConfiguration/LayerVisualization";
import { ModelHyperparameters } from "../components/ANNConfiguration/ModelHyperparameters";
import LayersEnums from "../utils/ANNConfiguration/LayersEnums";
import CodeSnippet from "../../node_modules/carbon-components-react/es/components/CodeSnippet/CodeSnippet";
import DataFetchService from "../services/DataFetchService";
import { LoadingBackdrop } from "../components/LoadingBackdrop";
import { SnackbarSuccess } from "../components/SnackbarSuccess";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router";
import { Error } from "../components/Error";
import { TableContainer } from "carbon-components-react";
import { Table } from "carbon-components-react";
import { TableHead } from "carbon-components-react";
import { TableRow } from "carbon-components-react";
import { TableCell } from "carbon-components-react";
import { TableBody } from "carbon-components-react";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const NewANNModel = ({ reviewing = false }) => {
  const layers = LayersEnums.Layers;
  const [newLayerDialogOpen, setNewLayerDialogOpen] = useState(false);
  const handleNewLayerDialogClose = () => setNewLayerDialogOpen(false);
  const handleNewLayerDialogOpen = () => setNewLayerDialogOpen(true);
  const [availableLayers, setAvailableLayers] = useState(layers.layers);
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

  const [testArchitectureDialogOpen, setTestArchitectureDialogOpen] =
    useState(false);
  const [testArchitectureErrors, setTestArchitectureErrors] = useState([]);
  const [testArchitectureReceivedData, setTestArchitectureReceivedData] =
    useState(undefined);
  const [testArchitectureSent, setTestArchitectureSent] = useState(false);
  const [testArchitectureTableLabels, setTestArchitectureTableLabels] =
    useState([]);
  const [testArchitectureSnackbarSuccess, setTestArchitectureSnackbarSuccess] =
    useState(false);
  const [dataset, setDataset] = useState("");
  const [epochs, setEpochs] = useState(10);

  const deleteLayer = (idx) => {
    let newLayers = addedLayers.filter((layer, id) => id !== idx);
    let newLayerHyperparameters = layersHyperparams
      .filter((obj) => obj.id !== idx)
      .map((filtered, newId) => {
        return { ...filtered, id: newId };
      });
    setAddedLayers(newLayers);
    setLayersHyperparams(newLayerHyperparameters);
  };

  const resetTestValues = () => {
    setTestArchitectureErrors([]);
    setTestArchitectureReceivedData(undefined);
    setTestArchitectureSent(false);
    setTestArchitectureTableLabels([]);
  };
  const classes = useStyles();

  const ArchitectureTest = () => {
    if (testArchitectureReceivedData !== undefined)
      return <ArchitectureResultsWindow />;
    else if (testArchitectureSent && testArchitectureReceivedData === undefined)
      return <ArchitectureLoadWindow />;
    return <ArchitectureOptionsWindow />;
  };

  const ArchitectureLoadWindow = () => {
    return (
      <div>
        <LinearProgress />
        <Alert
          severity="warning"
          style={{ textAlign: "left", marginBlock: "50px" }}
        >
          <AlertTitle>Heads up!</AlertTitle>
          The architecture test has been started, you can close this dialog if
          you want, but do not go outside this page. We will let you know when
          your results are ready.
        </Alert>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <CircularProgress color={"secondary"} />
        </div>
      </div>
    );
  };

  const ArchitectureResultsWindow = () => {
    return (
      <>
        <TableContainer component={Paper} style={{ padding: "20px" }}>
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Epoch</TableCell>
                {testArchitectureTableLabels.map((label) => (
                  <TableCell style={{ fontWeight: "bold" }}>{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {testArchitectureReceivedData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  {Object.keys(row).map((key) => (
                    <TableCell>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const ArchitectureOptionsWindow = () => {
    return (
      <>
        {testArchitectureErrors.length === 0 ? (
          <></>
        ) : (
          <Error title={"Error!"} subpoints={testArchitectureErrors} />
        )}
        <FormControl fullWidth style={{ marginBlock: "20px" }}>
          <InputLabel id="dataset">Dataset</InputLabel>
          <Select
            labelId="dataset"
            id="dataset"
            value={dataset}
            onChange={(event) => setDataset(event.target.value)}
          >
            <MenuItem value="MNIST">MNIST</MenuItem>
            <MenuItem value="FASHION">Fashion MNIST</MenuItem>
            <MenuItem value="BOSTON">BOSTON</MenuItem>
            <MenuItem value="CIFAR10">CIFAR10</MenuItem>
            <MenuItem value="CIFAR100">CIFAR100</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBlock: "20px" }}>
          <InputLabel id="epochs">Epochs</InputLabel>
          <Select
            labelId="epochs"
            id="epochs"
            value={epochs}
            onChange={(event) => setEpochs(event.target.value)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  };

  const sendTestArchitecture = () => {
    if (validateArchitectureCompilationData()) {
      setTestArchitectureSent(true);
      dfs
        .sendArchitecture(
          modelHyperparams.optimizer,
          modelHyperparams.loss,
          modelHyperparams.metrics,
          layersHyperparams,
          dataset,
          epochs
        )
        .then((data) => {
          if (data.success_status) {
            setTestArchitectureReceivedData(
              transformModelHistoryData(data.model)
            );
            setTestArchitectureSnackbarSuccess(true);
          }
        });
    }
  };

  const validateArchitectureCompilationData = () => {
    setTestArchitectureErrors([]);
    let isValid = true;
    if (dataset === "") {
      isValid = false;
      setTestArchitectureErrors((oldvals) => [
        ...oldvals,
        "The dataset has not been chosen",
      ]);
    }
    return isValid;
  };

  const transformModelHistoryData = (modelData) => {
    let i = 0;
    let returnable = [];
    for (i = 0; i < epochs; i++) {
      let row = {};
      for (var key in modelData) {
        row[key] = modelData[key][i];
      }
      returnable.push(row);
    }
    setTestArchitectureTableLabels(Object.keys(modelData));
    return returnable;
  };

  const handleTestArchitectureDialogOpen = () => {
    setTestArchitectureDialogOpen(true);
  };
  const handleTestArchitectureDialogClose = () => {
    setTestArchitectureDialogOpen(false);
  };
  const handleTestArchitectureDialogSent = () => {
    setTestArchitectureSent(true);
  };

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
    setToggleLoading(true);
    let res = await dfs.generateANNModel(
      modelHyperparams.optimizer,
      modelHyperparams.loss,
      modelHyperparams.metrics,
      layersHyperparams
    );
    setModelText(res.model);
    setToggleLoading(false);
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

  const handleLayerAddition = () => {
    setAddedLayers((layers) => [...layers, selectedLayer]);
    setLayersHyperparams((layers) => [
      ...layers,
      { title: selectedLayer, id: addedLayers.length, hyperparameters: {} },
    ]);
  };

  useEffect(() => {
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
      <SnackbarSuccess
        open={testArchitectureSnackbarSuccess}
        onClick={handleTestArchitectureDialogOpen}
        handleToggle={() =>
          setTestArchitectureSnackbarSuccess(!testArchitectureSnackbarSuccess)
        }
        text={"Your model results are ready! ♥"}
      />
      <Dialog
        open={testArchitectureDialogOpen}
        fullWidth={testArchitectureReceivedData === undefined}
        fullScreen={testArchitectureReceivedData !== undefined}
      >
        <DialogTitle>Test your architecture</DialogTitle>
        <DialogContent>
          <div style={{ overflow: "hidden", height: "100%" }}>
            <div
              style={{
                paddingRight: 17,
                height: "100%",
                width: "100%",
                overflowY: "scroll",
              }}
            >
              <ArchitectureTest />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleTestArchitectureDialogClose}
          >
            Close
          </Button>
          {testArchitectureReceivedData === undefined ? (
            <>
              <Button
                variant="contained"
                autoFocus
                onClick={sendTestArchitecture}
              >
                Send
              </Button>
            </>
          ) : (
            <Button variant="contained" autoFocus onClick={resetTestValues}>
              New test
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={codeSnippetOpen} fullScreen>
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
            <InputLabel id="layer">Layer</InputLabel>
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
                      onDelete={() => deleteLayer(idx)}
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
                <Grid item xs={6} md={6}>
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
                <Grid item xs={6} md={6}>
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
                <Grid item xs={6} md={6}>
                  <Button
                    style={{ width: "100%", height: "100%" }}
                    color="secondary"
                    variant="contained"
                    onClick={handleTestArchitectureDialogOpen}
                    startIcon={
                      testArchitectureReceivedData === undefined ? (
                        <BugReport />
                      ) : (
                        <Visibility />
                      )
                    }
                  >
                    {testArchitectureReceivedData === undefined
                      ? "Test the architecture"
                      : "View test results"}
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
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
