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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import {makeStyles} from "@mui/styles";
import AxiosClient from "../utils/AxiosClient";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const ManageTopics = () => {
  const [data, setData] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

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
    const res = await AxiosClient.delete(`http://127.0.0.1:8000/api/topics`, {
      data: {
        id: identifier,
      },
    });
    setSuccess(res.data.message === "ok");
  };

  const axiosCall = async () => {
    const res = await AxiosClient.get("http://127.0.0.1:8000/api/topics");
    let elements = res.data;
    console.log(elements);
    setData(elements);
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
      <div>
        <Container>
          <div>
            <Typography textAlign={"start"} variant="h4">
              TOPICS MANAGEMENT
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
                href="/admin/topics/new"
                startIcon={<Add />}
              >
                NEW TOPIC
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
              {"Do you want to delete this topic?"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
              <ul>
                <li>ID: {selectedEntry.id}</li>
                <li>Title: {selectedEntry.title}</li>
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

          <div>
            <TableContainer component={Paper} style={{ padding: "20px" }}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Title
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Order
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Course ID
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
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.topic_order}</TableCell>
                      <TableCell align="right">{row.course_id}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                          }}
                        >
                          <IconButton
                            href={`/admin/topic/edit/${row.id}`}
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
