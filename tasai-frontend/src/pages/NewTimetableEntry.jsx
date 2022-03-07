import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/es6";
import {
    Button,
    Container,
    Paper,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress, CircularProgress, Rating, TextField
} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import AxiosClient from "../utils/AxiosClient";
import {Error} from "../components/Error";
import {SuccessAlert} from "../components/SuccessAlert";
import _ from "lodash";
import DataFetchService from "../services/DataFetchService";
import { DateTimePicker } from "@mui/lab";

export const NewTimetableEntry = () => {
    const [course, setCourse] = useState(0);
    const [topic, setTopic] = useState(0);
    const [link, setLink] = useState("");
    const [date, setDate] = useState("");
    const [lesson, setLesson] = useState("");
    const [courses, setCourses] = useState(undefined);
    const [topics, setTopics] = useState([]);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState("");
    const cookies = new Cookies();
    const datafetchservice = new DataFetchService();

    const handleChange = async (event) => {
        setCourse(event.target.value);
        let elements = await datafetchservice.getCourseTopics(event.target.value);
        setTopics(elements);
    }
    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    }

    const getCourses = async () => {
        let res = await AxiosClient.get("http://127.0.0.1:8000/api/courses");
        setCourses(res.data);
    };

    useEffect(()=>{
        getCourses();
    }, []);

    const Validate = () => {
        let isDataValid = true;
        let num_regex = new RegExp("[1-9][0-9]*");
        setErrors([]);

        if (!_.isString(lesson) || _.isEqual(lesson, "")) {
            isDataValid = false;
            setErrors((errs) => [...errs, "Pamokos pavadinimas nenurodytas"]);
        }
        if (_.isEqual(course, 0)) {
            isDataValid = false;
            setErrors((errs) => [...errs, "Kursas nepasirinktas"]);
        }
        if (_.isEqual(topic, 0)) {
            isDataValid = false;
            setErrors((errs) => [...errs, "Tema nepasirinkta"]);
        }
        if (_.isEqual(date, '')  || _.isNull(date)) {
            isDataValid = false;
            setErrors((errs)=> [...errs, "Pamokos laikas nepasirinktas"]);
        }
        if (_.isEqual(link, '')) {
            isDataValid = false;
            setErrors((errs)=> [...errs, "Pamokos nuoroda nenurodyta"]);
        }
        return isDataValid;
    };

    const handleButtonClick = async () => {
        setSuccess(false);
        if (Validate()) {
            let res = await SendToDB();
            setSuccess(true);
        }
    };

    const SendToDB = async () => {
        AxiosClient.post("http://127.0.0.1:8000/api/timetables", {
            entry_title: lesson,
            link: link,
            topic_id: Number(topic),
            course_id: Number(course),
            lesson_time: date.format("YYYY-MM-DD hh:mm:ss")
        });
    };


    if(cookies.get("Authorization")===undefined)
    {
        return <>
        </>
    }
    else if (courses === undefined)
    {
        return <>
            <div>
                <LinearProgress />
                <div
                    style={{
                        display: "flex",
                        width: "100vw",
                        height: "75vh",
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <CircularProgress color={"secondary"} />
                </div>
            </div>
        </>
    }
    else return <>
        <Container style={{minHeight:'100vh'}}>
            <div style={{paddingTop:'50px'}}>
                <Typography textAlign={"start"} variant="h4" style={{fontFamily: "Montserrat, sans-serif",}}>
                    NAUJAS TVARKARAŠČIO ĮRAŠAS
                </Typography>
                <div
                    style={{
                        display: "flex",
                        marginBlock: "30px",
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<ArrowBack />}
                        href="/admin/timetables"
                        style={{ backgroundColor: "#B7094C " }}
                    >
                        Atgal
                    </Button>
                </div>
                {errors.length === 0 ? (
                    <></>
                ) : (
                    <Error title={"Klaida įvedant duomenis"} subpoints={errors} />
                )}
                {success ? (
                    <>
                        <SuccessAlert />
                    </>
                ) : (
                    <></>
                )}
                <div>
                    <Paper elevation={2} style={{padding:'25px'}}>
                        <Grid container spacing={2} style={{paddingBlock:'20px'}}>
                            <Grid item xs={12} md={8}>
                                <FormControl fullWidth>
                                    <InputLabel id="course-label">Kursas</InputLabel>
                                    <Select
                                        labelId="course-label"
                                        id="course-select"
                                        value={course}
                                        label="course_id"
                                        onChange={handleChange}
                                    >
                                        {courses.map((courseSelect) => (
                                            <MenuItem value={courseSelect.id}>
                                                {courseSelect.id} - {courseSelect.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                    <InputLabel id="topic-label">Tema</InputLabel>
                                    <Select
                                        labelId="topic-label"
                                        id="topic-select"
                                        value={topic}
                                        disabled={course===0}
                                        label="course_id"   
                                        onChange={handleTopicChange}
                                    >
                                        {topics.map((topicSelect) => (
                                            <MenuItem value={topicSelect.id}>
                                                {topicSelect.id} - {topicSelect.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField style={{width:"100%"}} label="Pamokos pavadinimas" value={lesson} onChange={(event)=>setLesson(event.target.value)}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField style={{width:"100%"}} label="Pamokos nuoroda" value={link} onChange={(event)=>setLink(event.target.value)}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <DateTimePicker
                                disablePast
                                required
                                label="Pamokos pradžios laikas"
                                value={date}
                                onChange={(val) => {
                                    setDate(val);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} required style={{ width: "100%" }} />
                                )}
                                />
                            </Grid>
                        </Grid>
                        <div style={{paddingBlock:'20px', display:'flex', justifyContent:'flex-end'}}>
                            <Button variant={"contained"} onClick={handleButtonClick}>
                                Išsaugoti
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </Container>
    </>
};