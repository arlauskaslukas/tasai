import logo from "./logo.svg";
import "./App.css";
import bg from "./assets/background.svg";
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

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <NavBar />
      <div className="App" style={{ backgroundColor: "#FCFCFC" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/register"} element={<Register />} />
            <Route exact path={"/admin"} element={<AdminDashboard />} />
            <Route exact path={"/admin/courses"} element={<ManageCourses />} />
            <Route exact path={"/admin/courses/new"} element={<NewCourse />} />
            <Route path={"/admin/course/edit/:id"} element={<EditCourse />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
