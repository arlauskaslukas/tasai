import {
  Alert,
  AlertTitle,
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
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import AxiosClient from "../utils/AxiosClient";
import { DeleteSuccess } from "../components/DeleteSuccess";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const ManageMedia = () => {
  const [data, setData] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  const axiosCall = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/media");
    let elements = res.data;
    console.log(elements);
    setData(elements);
  };

  useEffect(() => {
    axiosCall();
    setLoadingStatus(false);
  }, []);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmation = async () => {
    SendToDB();
    await axiosCall();
    setDialogOpen(false);
  };

  const SendToDB = async () => {
    let identifier = Number(selectedEntry.id);
    const res = await AxiosClient.delete(`http://127.0.0.1:8000/api/media`, {
      data: {
        id: identifier,
      },
    });
    console.log(res);
    setSuccess(res.data.response === "ok");
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
      <div style={{ minHeight: "100vh", paddingTop: "10vh" }}>
        <Container>
          <div>
            <Typography textAlign={"start"} variant="h4">
              MEDIA FILES MANAGEMENT
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
              <Button
                variant="contained"
                href="/admin/media/new"
                startIcon={<Add />}
              >
                NEW MEDIA FILE
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
              {"Do you really want to delete this media entry?"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
              <Alert
                severity="warning"
                style={{ textAlign: "left", marginBlock: "50px" }}
              >
                <AlertTitle>Heads up!</AlertTitle>
                The following action will only remove the reference to the file.
                Physical file removal on disk should be done manually.
              </Alert>
              <ul>
                <li>ID: {selectedEntry.id}</li>
                <li>File: {selectedEntry.filename}</li>
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
          <div>
            <TableContainer component={Paper} style={{ padding: "20px" }}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      File name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Related topic ID
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.filename}</TableCell>
                      <TableCell align="right">{row.topic_id}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              setSelectedEntry(row);
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
          </div>
        </Container>
      </div>
    );
};
