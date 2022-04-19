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
import { ArrowBack, Close, Person, RoomRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import AxiosClient from "../utils/AxiosClient";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const ManageUsers = () => {
  const [data, setData] = useState(undefined);
  const [blocked, setBlocked] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [unblockDialogOpen, setUnblockDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  const handleClickBlockOpen = () => {
    setBlockDialogOpen(true);
  };

  const handleBlockClose = () => {
    setBlockDialogOpen(false);
  };

  const handleBlockConfirmation = () => {
    SendToDB();
    setBlockDialogOpen(false);
    axiosCall();
    axiosBlockedCall();
  };

  const handleClickUnblockOpen = () => {
    setUnblockDialogOpen(true);
  };

  const handleUnblockClose = () => {
    setUnblockDialogOpen(false);
  };

  const handleUnblockConfirmation = () => {
    UnblockSendToDB();
    setUnblockDialogOpen(false);
    axiosCall();
    axiosBlockedCall();
  };

  const SendToDB = async () => {
    let identifier = Number(selectedEntry.id);
    const res = await AxiosClient.delete(`http://127.0.0.1:8000/api/users`, {
      data: {
        id: identifier,
      },
    });
    setSuccess(res.data.message === "ok");
  };

  const UnblockSendToDB = async () => {
    let identifier = Number(selectedEntry.id);
    const res = await AxiosClient.post(
      `http://127.0.0.1:8000/api/restoreuser`,
      {
        id: identifier,
      }
    );
    setSuccess(res.data.message === "ok");
  };

  const axiosCall = async () => {
    const res = await AxiosClient.get("http://127.0.0.1:8000/api/users");
    let elements = res.data;
    console.log(elements);
    setData(elements);
  };
  const axiosBlockedCall = async () => {
    const res = await AxiosClient.get("http://127.0.0.1:8000/api/blockedusers");
    let elements = res.data;
    console.log(elements);
    setBlocked(elements);
  };

  useEffect(() => {
    axiosCall();
    axiosBlockedCall();
    setLoadingStatus(false);
  }, []);
  if (data === undefined || blocked === undefined) {
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
              USER MANAGEMENT
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
                style={{ backgroundColor: "#B7094C" }}
              >
                Back
              </Button>
            </div>
          </div>

          <Dialog
            open={blockDialogOpen}
            onClose={() => handleBlockClose()}
            aria-labelLedby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you want to block this user?"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
              <ul>
                <li>ID: {selectedEntry.id}</li>
                <li>Username: {selectedEntry.name}</li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleBlockClose()}>Cancel</Button>
              <Button
                variant="contained"
                autoFocus
                onClick={() => handleBlockConfirmation()}
              >
                Block
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={unblockDialogOpen}
            onClose={() => handleUnblockClose()}
            aria-labelLedby="alert-dialog-title2"
            aria-describedby="alert-dialog-description2"
          >
            <DialogTitle id="alert-dialog-title2">
              {"Do you want to unblock this user?"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
              <ul>
                <li>ID: {selectedEntry.id}</li>
                <li>Username: {selectedEntry.name}</li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleUnblockClose()}>Cancel</Button>
              <Button
                variant="contained"
                autoFocus
                onClick={() => handleUnblockConfirmation()}
              >
                Unblock
              </Button>
            </DialogActions>
          </Dialog>

          <Typography
            variant="h5"
            style={{ marginBlock: "20px", textAlign: "left" }}
          >
            ACTIVE USERS
          </Typography>

          <div>
            <TableContainer component={Paper} style={{ padding: "20px" }}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Username
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Email
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Role
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
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        {row.is_admin == "1" ? "Admin" : "User"}
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                          }}
                        >
                          {row.is_admin == 1 ? (
                            <></>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "#A01929",
                                color: "#FFFFFF",
                              }}
                              onClick={() => {
                                setSelectedEntry(row);
                                handleClickBlockOpen();
                              }}
                              startIcon={<Close />}
                              aria-label="Block user"
                            >
                              Block
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Typography
            variant="h5"
            style={{ marginBlock: "20px", textAlign: "left" }}
          >
            BLOCKED USERS
          </Typography>

          <div>
            <TableContainer component={Paper} style={{ padding: "20px" }}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Username
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Email
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Role
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blocked.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        {row.is_admin == "1" ? "Admin" : "User"}
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                          }}
                        >
                          {row.is_admin == 1 ? (
                            <></>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "#14708D",
                                color: "#FFFFFF",
                              }}
                              onClick={() => {
                                setSelectedEntry(row);
                                handleClickUnblockOpen();
                              }}
                              startIcon={<Person />}
                              aria-label="Block user"
                            >
                              Unblock
                            </Button>
                          )}
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
