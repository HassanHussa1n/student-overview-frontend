import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import FrontPage from "./FrontPage";
export default function Main() {
  return (
    <div>
      <Routes>
        <Route path="/home/:id" element={<FrontPage />} />
        <Route path="/" element={<Login />} />
      </Routes>
      ;
    </div>
  );
}
