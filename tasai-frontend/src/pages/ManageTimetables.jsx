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
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowBack, ExpandMore } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import AxiosClient from "../utils/AxiosClient";
import { DeleteSuccess } from "../components/DeleteSuccess";
import DataFetchService from "../services/DataFetchService";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const ManageTimetables = () => {
  const [data, setData] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState("");
  const classes = useStyles();
  const datafetchservice = new DataFetchService();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmation = () => {
    SendToDB();
    setDialogOpen(false);
  };

  const SendToDB = async () => {
    let identifier = Number(selectedEntry.id);
    console.log(`http://127.0.0.1:8000/api/timetables/${identifier}`);
    const res = await AxiosClient.delete(
      `http://127.0.0.1:8000/api/timetables/${identifier}`
    );
    setSuccess(res.data.response === "ok");
    axiosCall();
  };

  const axiosCall = async () => {
    const res = await datafetchservice.getTimetables();
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    axiosCall();
    setLoadingStatus(false);
  }, []);
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
          <div style={{ paddingTop: "20px" }}>
            <Typography
              textAlign={"start"}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
              }}
              variant="h4"
            >
              TIMETABLES MANAGEMENT
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
                BACK
              </Button>
              <Button
                variant="contained"
                href="/admin/timetables/new"
                startIcon={<Add />}
              >
                NEW ENTRY
              </Button>
            </div>
          </div>

          <Dialog
            open={dialogOpen}
            onClose={() => handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you want to delete this entry?"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
              <ul>
                <li>ID: {selectedEntry.id}</li>
                <li>Title: {selectedEntry.entry_title}</li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button
                variant="contained"
                autoFocus
                onClick={() => handleConfirmation()}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {success ? <DeleteSuccess /> : <></>}

          {data.map((row) => (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{row.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {row.timetable.length === 0 ? (
                  <>
                    <Typography>
                      No timetable entries related to this course have been
                      found.
                    </Typography>
                    <Button
                      variant="contained"
                      href="/admin/timetables/new"
                      startIcon={<Add />}
                    >
                      NEW ENTRY
                    </Button>
                  </>
                ) : (
                  <>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead className={classes.head}>
                          <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Entry ID
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontWeight: "bold" }}
                            >
                              Title
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: "bold" }}
                              align="right"
                            >
                              Date
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: "bold" }}
                              align="right"
                            >
                              Join link
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: "bold" }}
                              align="right"
                            >
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.timetable.map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell component="th" scope="row">
                                {entry.id}
                              </TableCell>
                              <TableCell align="right">
                                {entry.entry_title}
                              </TableCell>
                              <TableCell align="right">
                                {entry.lesson_time}
                              </TableCell>
                              <TableCell align="right">
                                <a href={entry.link}>{entry.link}</a>
                              </TableCell>
                              <TableCell>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "end",
                                  }}
                                >
                                  <IconButton
                                    href={`/admin/timetable/edit/${entry.id}`}
                                    aria-label="edit"
                                    style={{ color: "#0091AD" }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      setSelectedEntry(entry);
                                      handleClickOpen();
                                    }}
                                    aria-label="delete"
                                    style={{ color: "#A01929" }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </div>
    );
};
