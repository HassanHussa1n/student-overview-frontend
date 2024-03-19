import { Routes, Route, Link } from "react-router-dom";
import Login from "../Login";
import HomePage from "./HomePage";
import LecturePage from "./LecturePage";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import { MyContext } from "../../App.jsx";
import { useContext } from "react";
import ClassroomPage from "./ClassroomPage";
import Logo from "../../assets/images/BobsLogo2.png";
export default function Main() {
  const { currentUser } = useContext(MyContext);

  return (
    <div className="main-container">
      <Link to={`/home/${currentUser.id}`}>
        <img src={Logo} alt="Logo" className="logo" />
      </Link>

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
