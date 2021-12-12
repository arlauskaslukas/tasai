import {
  Button,
  CircularProgress,
  Container,
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
import { ArrowBack, Close, RoomRounded } from "@mui/icons-material";
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

export const ManageTopics = () => {
  const [data, setData] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const axiosCall = async () => {
      const res = await AxiosClient.get("http://127.0.0.1:8000/api/topics");
      let elements = res.data;
      console.log(elements);
      setData(elements);
    };
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
  } else if (data !== undefined)
    return (
      <div>
        <Container>
          <div>
            <Typography textAlign={"start"} variant="h4">
              KURSŲ TEMŲ VALDYMAS
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
            </div>
          </div>

          <div>
            <TableContainer component={Paper} style={{ padding: "20px" }}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Temos ID
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Temos pavadinimas
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Temos eiliškumas
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Kurso ID
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
                            href={`/admin/course/edit/${row.id}`}
                            aria-label="edit"
                            style={{ color: "#0091AD" }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
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
