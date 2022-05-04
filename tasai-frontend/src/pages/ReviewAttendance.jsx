import {
    Button,
    CircularProgress,
    Container,
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
import axios from "axios";
import {ArrowBack} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import _ from "lodash";
import AxiosClient from "../utils/AxiosClient";
import {DeleteSuccess} from "../components/DeleteSuccess";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#B8E7F5",
  },
}));

export const ReviewAttendance = () => {
  const [data, setData] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  const axiosCall = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/attendances");
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
  } else
    return (
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <div>
            <Typography textAlign={"start"} variant="h4">
              ATTENDANCE REPORT
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
          {success ? <DeleteSuccess /> : <></>}
          <div>
            <TableContainer component={Paper} style={{ padding: "20px" }}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Attendance ID
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      User
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Topic
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Attendance status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.user[0].name}</TableCell>
                      <TableCell align="right">{row.topic[0].title}</TableCell>
                      <TableCell align="right">
                        {row.is_attending === 1 ? "Attends" : "Did not attend"}
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
