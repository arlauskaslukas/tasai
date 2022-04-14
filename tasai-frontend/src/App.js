import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ManageCourses } from "./pages/ManageCourses";
import { NewCourse } from "./pages/NewCourse";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import { EditCourse } from "./pages/EditCourse";
import { NavBar } from "./components/NavBar";
import { ManageUsers } from "./pages/ManageUsers";
import { ManageTopics } from "./pages/ManageTopics";
import { ManageAssignments } from "./pages/ManageAssignments";
import { NewTopic } from "./pages/NewTopic";
import { EditTopic } from "./pages/EditTopic";
import { CreateAssignment } from "./pages/CreateAssignment";
import { EditAssignment } from "./pages/EditAssignment";
import { EditProfile } from "./pages/EditProfile";
import { Home } from "./pages/Home";
import { ViewCourses } from "./pages/ViewCourses";
import { MoreCourses } from "./pages/MoreCourses";
import { ViewCourse } from "./pages/ViewCourse";
import { MyCourses } from "./pages/MyCourses";
import { ViewEnrolledCourse } from "./pages/ViewEnrolledCourse";
import React from "react";
import { ViewEnrolledTopic } from "./pages/ViewEnrolledTopic";
import { Footer } from "./components/Footer";
import { ViewTestimonials } from "./pages/ViewTestimonials";
import { NewTestimonial } from "./pages/NewTestimonial";
import { ViewCourseTimetable } from "./pages/ViewCourseTimetable";
import { DownloadTimetable } from "./pages/DownloadTimetable";
import { ManageTimetables } from "./pages/ManageTimetables";
import { NewTimetableEntry } from "./pages/NewTimetableEntry";
import { EditTimetableEntry } from "./pages/EditTimetableEntry";
import { NewANNModel } from "./pages/NewANNModel";
import { ReviewAttendance } from "./pages/ReviewAttendance";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <NavBar />
      <div className="App" style={{ backgroundColor: "#FCFCFC" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/register"} element={<Register />} />
            <Route exact path={"/courses"} element={<ViewCourses />} />
            <Route exact path={"/mycourses"} element={<MyCourses />} />
            <Route exact path={"/morecourses"} element={<MoreCourses />} />
            <Route exact path={"/course/:id"} element={<ViewCourse />} />
            <Route
              exact
              path={"/mycourses/:id"}
              element={<ViewEnrolledCourse />}
            />
            <Route
              exact
              path="/mycourses/:course_id/topic/:topic_id"
              element={<ViewEnrolledTopic />}
            />
            <Route
              exact
              path={"/mycourses/:id/timetable"}
              element={<ViewCourseTimetable />}
            />
            <Route
              exact
              path={"/mycourses/:id/timetable/download"}
              element={<DownloadTimetable />}
            />
            <Route exact path={"/newmodel"} element={<NewANNModel />} />
            <Route exact path={"/admin"} element={<AdminDashboard />} />
            <Route exact path={"/admin/courses"} element={<ManageCourses />} />
            <Route exact path={"/admin/users"} element={<ManageUsers />} />
            <Route exact path={"/admin/topics"} element={<ManageTopics />} />

            <Route
              exact
              path={"/admin/assignments"}
              element={<ManageAssignments />}
            />
            <Route exact path={"/admin/courses/new"} element={<NewCourse />} />
            <Route
              exact
              path={"/admin/assignments/new"}
              element={<CreateAssignment />}
            />
            <Route exact path={"/admin/topics/new"} element={<NewTopic />} />
            <Route path={"/admin/course/edit/:id"} element={<EditCourse />} />
            <Route
              exact
              path={"/admin/topic/edit/:id"}
              element={<EditTopic />}
            />
            <Route
              exact
              path={"/admin/assignment/edit/:id"}
              element={<EditAssignment />}
            />

            <Route
              exact
              path={"/admin/timetable/edit/:id"}
              element={<EditTimetableEntry />}
            />
            <Route
              exact
              path={"/admin/timetables"}
              element={<ManageTimetables />}
            />
            <Route
              exact
              path={"/admin/timetables/new"}
              element={<NewTimetableEntry />}
            />
            <Route
              exact
              path={"/admin/attendance"}
              element={<ReviewAttendance />}
            />

            <Route exact path={"/profile"} element={<EditProfile />} />

            <Route
              exact
              path={"/testimonials"}
              element={<ViewTestimonials />}
            />
            <Route
              exact
              path={"/testimonials/new"}
              element={<NewTestimonial />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </LocalizationProvider>
  );
}

export default App;
