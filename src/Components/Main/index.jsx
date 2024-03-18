import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import HomePage from "./HomePage";
import LecturePage from "./LecturePage";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import SideBar from "../SideBar";
import ClassroomPage from "./ClassroomPage";
export default function Main() {
  return (
    <div className="main-container">
      <SideBar></SideBar>
      <Routes>
        <Route path="/home/:id" element={<HomePage />} />
        <Route path="/lectures/:id" element={<LecturePage />} />
        <Route path="/students/:id" element={<StudentPage />} />
        <Route path="/teachers/:id" element={<TeacherPage />} />
        <Route path="/classroom/:id" element={<ClassroomPage />} />
        <Route path="" element={<Login />} />
      </Routes>
    </div>
  );
}
