import { useState, useEffect, createContext } from "react";
import Login from "./Components/Login";
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";
import "./App.css";

const MyContext = createContext();
//Seperate context for login
const LoginContext = createContext();

function App() {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  //Set currentuser = null if localStorage is not saved(logged out)
  const [currentUser, setCurrentUser] = useState(null);
  //Set current classroom with simular logic as currentuser
  const [currentClassroom, setCurrentClassroom] = useState(null);
  //Usestates for rerender after post
  const [theUsersClassrooms, setTheUserClassrooms] = useState([]);
  const [theClassroomsLectures, setTheClassroomsLectures] = useState([]);
  //Usestate for creating (postrequests)
  const [newClassroom, setNewClassroom] = useState({
    teacherId: "",
    name: "",
    startDate: "",
    endDate: "",
  });
  const [newExercise, setNewExercise] = useState({
    lectureId: "",
    description: "",
    linkToRepo: "",
    name: "",
  });

  //Set the loggedin user the the last logged in
  useEffect(() => {
    const loggedInId = localStorage.getItem("loggedInId");
    //If loggedInId exists, and users is set, find the user and set it as the logged in user
    if (loggedInId && teachers) {
      const foundUser = teachers.find(
        (userItem) => Number(userItem.id) === Number(loggedInId)
      );
      setCurrentUser(foundUser);
    }
  }, [teachers]);

  useEffect(() => {
    //Set classroom based on user
    //Set the key to something informative
    if (currentUser) {
      const keyname = "user" + currentUser.id;
      //Get the value of current classroom
      const classroomId = localStorage.getItem(keyname);
      console.log("classid:", classroomId);
      if (classroomId && currentUser.classrooms) {
        const foundClassroom = currentUser.classrooms.find(
          (item) => Number(item.id) === Number(classroomId)
        );
        setCurrentClassroom(foundClassroom);
      } else {
        setCurrentClassroom(null);
      }
    }
  }, [currentUser]);

  //UseEffect for teachers
  useEffect(() => {
    fetch(`http://localhost:4000/teacher`)
      .then((response) => response.json())
      .then((item) => setTeachers(item));
  }, [newClassroom]);

  //UseEffect for classrooms
  useEffect(() => {
    fetch(`http://localhost:4000/classroom`)
      .then((response) => response.json())
      .then((item) => setClassrooms(item));
  }, [newExercise]);

  //UseEffect for the currentusers' classrooms
  useEffect(() => {
    if (currentUser) {
      setTheUserClassrooms([...currentUser.classrooms]);
    }
  }, [teachers, currentUser]);

  //UseEffect for the currentclassrom's lectures
  useEffect(() => {
    if (currentClassroom) {
      setTheClassroomsLectures([...currentClassroom.lectures]);
    }
  }, [classrooms, currentClassroom]);

  return (
    <div className="container">
      {currentUser ? (
        <MyContext.Provider
          value={{
            teachers,
            currentUser,
            setCurrentUser,
            currentClassroom,
            setCurrentClassroom,
            classrooms,
            newClassroom,
            setNewClassroom,
            theUsersClassrooms,
            setTeachers,
            newExercise,
            setNewExercise,
            theClassroomsLectures,
          }}
        >
          <Main />
          <SideBar />
        </MyContext.Provider>
      ) : (
        <LoginContext.Provider
          value={{ teachers, currentUser, setCurrentUser }}
        >
          <Login />
        </LoginContext.Provider>
      )}
    </div>
  );
}

export { App, MyContext, LoginContext };
