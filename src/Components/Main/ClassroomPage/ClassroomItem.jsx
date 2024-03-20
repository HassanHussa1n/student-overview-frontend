import React, { useContext } from "react";
import { MyContext } from "../../../App.jsx";
export default function ClassroomItem(props) {
  const { setCurrentClassroom, currentUser } = useContext(MyContext);

  const changeClassroom = () => {
    const keyname = "user" + currentUser.id;
    localStorage.setItem(keyname, props.classroomItem.id);
    console.log("classroomid:!!:", localStorage.getItem(keyname));
    const classroomId = localStorage.getItem(keyname);
    const foundClassroom = currentUser.classrooms.find(
      (item) => Number(item.id) === Number(classroomId)
    );
    setCurrentClassroom(foundClassroom);
  };

  const end = () => {
    setCurrentClassroom(null);
    const keyname = "user" + currentUser.id;
    localStorage.removeItem(keyname);
  };
  return (
    <li>
      <p>{props.classroomItem.name}</p>
      <p>Starts: {props.classroomItem.startDate}</p>
      <p>Ends: {props.classroomItem.endDate}</p>
      <button onClick={changeClassroom}>Choose classroom</button>
      <button onClick={end}>End usage</button>
    </li>
  );
}
