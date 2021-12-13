import {
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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowBack, RoomRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RegexTools from "../utils/RegexTools";
import _ from "lodash";
import AxiosClient from "../utils/AxiosClient";
import { DeleteSuccess } from "../components/DeleteSuccess";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const ManageAssignments = () => {
  const [data, setData] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  const axiosCall = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/assignments");
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

  const handleConfirmation = () => {
    SendToDB();
    setDialogOpen(false);
    axiosCall();
  };

  const SendToDB = async () => {
    let identifier = Number(selectedEntry.id);
    const res = await AxiosClient.delete(
      `http://127.0.0.1:8000/api/assignments`,
      {
        data: {
          id: identifier,
        },
      }
    );
    setSuccess(res.data.message === "ok");
  };

  const formatDate = (string) => {
    let returnable = _.replace(string, new RegExp(".[0-9]*Z"), "");
    returnable = _.replace(returnable, "T", " ");
    return returnable;
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
  } else if (data !== undefined)
    return (
      <div>
        <Container>
          <div>
            <Typography textAlign={"start"} variant="h4">
              ATSISKAITYMŲ VALDYMAS
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
                Atgal
              </Button>
              <Button
                variant="contained"
                href="/admin/assignments/new"
                startIcon={<Add />}
              >
                Pridėti naują atsiskaitymą
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
              {"Ar tikrai norite pašalinti šį įrašą?"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
              <ul>
                <li>ID: {selectedEntry.id}</li>
                <li>Pavadinimas: {selectedEntry.title}</li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Atšaukti</Button>
              <Button
                variant="contained"
                autoFocus
                onClick={() => handleConfirmation()}
              >
                Ištrinti
              </Button>
            </DialogActions>
          </Dialog>
          {success ? <DeleteSuccess /> : <></>}
          <div>
            <TableContainer component={Paper} style={{ padding: "20px" }}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Atsiskaitymo ID
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Atsiskaitymo pavadinimas
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Susietos temos ID
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Atsiskaitymo pateikimo data
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Veiksmai
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.topic_id}</TableCell>
                      <TableCell align="right">
                        {formatDate(row.deadline)}
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
                            href={`/admin/assignment/edit/${row.id}`}
                            aria-label="edit"
                            style={{ color: "#0091AD" }}
                          >
                            <EditIcon />
                          </IconButton>
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
