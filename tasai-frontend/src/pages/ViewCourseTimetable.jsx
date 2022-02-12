import React from "react";
import {useParams} from "react-router";
import {Button, Container, Paper, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import DownloadIcon from '@mui/icons-material/Download';

const mockData = [
    {
        entry_title: "Test entry title",
        lesson_time: "2022-02-09 09:00:00",
        link: "http://link.to/lesson/livestream"
    },
    {
        entry_title: "Test entry title 2",
        lesson_time: "2022-02-09 11:00:00",
        link: "http://link.to/lesson/livestream2"
    }
];

export const ViewCourseTimetable = () => {
    const {id} = useParams();
    return <>
        <Container style={{minHeight:'100vh'}}>
            <div style={{paddingTop:'50px'}}>
                <Typography textAlign={"start"} variant="h4" style={{fontFamily: "Montserrat, sans-serif",}}>
                    KURSO GYVŲ PAMOKŲ TRANSLIACIJOS TVARKARAŠTIS
                </Typography>
                <div
                    style={{
                        display: "flex",
                        marginBlock: "30px",
                    }}
                >
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <Button
                            variant="contained"
                            startIcon={<ArrowBack />}
                            href={`/mycourses/${id}`}
                            style={{ backgroundColor: "#B7094C " }}
                        >
                            Atgal
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon/>}
                        >
                            Atsisiųsti tvarkaraštį kalendoriaus programai
                        </Button>
                    </div>
                </div>
                {mockData.map((entry)=>(
                    <Paper elevation={2} style={{padding:'25px', marginBlock:'25px'}}>
                        <Typography variant={"h5"} textAlign={"left"} style={{fontFamily: "Montserrat, sans-serif",marginBottom:'25px'}}>
                            {entry.entry_title}
                        </Typography>
                        <Typography variant={"body1"} textAlign={"left"} style={{fontFamily: "Montserrat, sans-serif",marginBottom:'25px'}}>
                            Pamokos laikas: {entry.lesson_time}
                        </Typography>
                        <Typography variant={"body1"} textAlign={"left"} style={{fontFamily: "Montserrat, sans-serif",marginBottom:'25px'}}>
                            Nuoroda prisijungimui: <a href={entry.link}>{entry.link}</a>
                        </Typography>
                    </Paper>
                ))}
            </div>
        </Container>
    </>
};