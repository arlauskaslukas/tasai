import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ArrowBack,
  ExpandMore,
  SaveAlt,
  StarRate,
  Visibility,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import AxiosClient from "../utils/AxiosClient";
import DataFetchService from "../services/DataFetchService";
import { SuccessAlert } from "../components/SuccessAlert";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const ManageAssignmentEntries = () => {
  const [data, setData] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();
  const [rating, setRating] = useState(1);

  let dfs = new DataFetchService();

  const axiosCall = async () => {
    let elements = await dfs.getAssignmentEntries();
    console.log(elements);
    setData(elements);
  };

  useEffect(() => {
    axiosCall();
    setLoadingStatus(false);
  }, []);

  const handleClickOpen = () => {
    setSuccess(false);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmation = () => {
    SendToDB();
    setDialogOpen(false);
    setSuccess(true);
    axiosCall();
  };

  const SendToDB = async () => {
    const res = await AxiosClient.put(
      `http://127.0.0.1:8000/api/assignmententries`,
      {
        rating: rating,
        id: selectedEntry,
      }
    );
    setSuccess(res.data.message === "ok");
  };

  const formatDate = (string) => {
    let returnable = _.replace(string, new RegExp(".[0-9]*Z"), "");
    returnable = _.replace(returnable, "T", " ");
    return returnable;
  };

  const handleDownload = async (fileURL) => {
    console.log(fileURL);
    dfs
      .getFile(fileURL)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        let substrings = _.split(fileURL, "/");
        let downloadfile = _.last(substrings);
        link.setAttribute("download", downloadfile);
        document.body.appendChild(link);
        link.click();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  if (data === undefined) {
    return (
      <div>
        <LinearProgress />
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
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
  } else
    return (
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <div>
            <Typography textAlign={"start"} variant="h4">
              ASSIGNMENTS MANAGEMENT
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                href="/admin"
                style={{ backgroundColor: "#B7094C " }}
              >
                Back
              </Button>
            </div>
          </div>

          <Dialog
            open={dialogOpen}
            onClose={() => handleClose()}
            aria-labelLedby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Rate assignment entry"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
              <FormControl fullWidth style={{ marginBlock: "20px" }}>
                <InputLabel id="rating">Rating</InputLabel>
                <Select
                  labelId="rating"
                  id="rating"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                >
                  {[...Array(10).keys()].map((num) => (
                    <MenuItem value={num + 1}>{num + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button
                variant="contained"
                autoFocus
                onClick={() => handleConfirmation()}
              >
                Rate
              </Button>
            </DialogActions>
          </Dialog>
          {success ? <SuccessAlert /> : <></>}
          <div>
            {data.map((topic) => (
              <>
                {topic.assignments.map((assignment) => (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>
                        Topic: {topic.title}. Assignment: {assignment.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {assignment.entries.length === 0 ? (
                        <>
                          <Typography>No entries found yet.</Typography>
                        </>
                      ) : (
                        <TableContainer
                          component={Paper}
                          style={{ padding: "20px" }}
                        >
                          <Table>
                            <TableHead className={classes.head}>
                              <TableRow key="0">
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Entry ID
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  User
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Submission type
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Submitted at
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Rated?
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Actions
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {assignment.entries.map((entry) => (
                                <TableRow key={entry.id}>
                                  <TableCell>{entry.id}</TableCell>
                                  <TableCell style={{ fontWeight: "bold" }}>
                                    {entry.username}
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bold" }}>
                                    {entry.type}
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bold" }}>
                                    {formatDate(entry.submitted)}
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bold" }}>
                                    {entry.rating === 0 ? "No" : "Yes"}
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bold" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                      }}
                                    >
                                      {entry.type === "file" ? (
                                        <Button
                                          variant="contained"
                                          onClick={() =>
                                            handleDownload(entry.asset)
                                          }
                                          startIcon={<SaveAlt />}
                                        >
                                          Download
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="contained"
                                          href={`/admin/models/${entry.asset}`}
                                          startIcon={<Visibility />}
                                        >
                                          View model
                                        </Button>
                                      )}
                                      <Button
                                        variant="contained"
                                        startIcon={<StarRate />}
                                        onClick={() => {
                                          setSelectedEntry(entry.id);
                                          handleClickOpen();
                                        }}
                                      >
                                        Rate
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            ))}
          </div>
        </Container>
      </div>
    );
};
