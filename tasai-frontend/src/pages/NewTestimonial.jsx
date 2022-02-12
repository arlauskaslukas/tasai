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

export const NewTestimonial = () => {
    const [course, setCourse] = useState(0);
    const [rating, setRating] = useState(0);
    const [testimonial, setTestimonial] = useState("");
    const [courses, setCourses] = useState(undefined);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const cookies = new Cookies();

    const handleChange = (event) => {
        setCourse(event.target.value);
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

        if (!_.isString(testimonial) || _.isEqual(testimonial, "")) {
            isDataValid = false;
            setErrors((errs) => [...errs, "Atsiliepimo laukas privalomas"]);
        }
        if (_.isEqual(course, 0)) {
            isDataValid = false;
            setErrors((errs) => [...errs, "Kursas nepasirinktas"]);
        }
        if (_.isEqual(rating, 0)) {
            isDataValid = false;
            setErrors((errs) => [...errs, "Vertinimas turi būti intervale nuo 1 iki 5"]);
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
        AxiosClient.post("http://127.0.0.1:8000/api/testimonials", {
            testimonial: testimonial,
            rating: rating,
            course_id: Number(course),
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
                    NAUJAS ATSILIEPIMAS
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
                        href="/testimonials"
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
                                <Typography component={"legend"}>
                                    Kursų įvertinimas
                                </Typography>
                                <Rating value={rating} onChange={(event, newVal)=>setRating(newVal)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField style={{width:"100%"}} value={testimonial} onChange={(event)=>setTestimonial(event.target.value)} multiline rows={4}/>
                            </Grid>
                        </Grid>
                        <div style={{paddingBlock:'20px', display:'flex', justifyContent:'flex-end'}}>
                            <Button variant={"contained"} onClick={handleButtonClick}>
                                Siųsti atsiliepimą
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </Container>
    </>
};