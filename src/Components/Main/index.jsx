import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import HomePage from "./HomePage";
export default function Main() {
  return (
    <div>
      <Routes>
        <Route path="/home/:id" element={<HomePage />} />
        <Route path="" element={<Login />} />
      </Routes>
    </div>
  );
}
