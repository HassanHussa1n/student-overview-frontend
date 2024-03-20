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
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  //Set currentuser = null if localStorage is not saved(logged out)
  const [currentUser, setCurrentUser] = useState(null);
  //Set current classroom with simular logic as currentuser
  const [currentClassroom, setCurrentClassroom] = useState(null);

  //Set the loggedin user the the last logged in
  useEffect(() => {
    const loggedInId = localStorage.getItem("loggedInId");
    //If loggedInId exists, and users is set, find the user and set it as the logged in user
    if (loggedInId && teachers) {
      const foundUser = teachers.find(
        (userItem) => Number(userItem.id) === Number(loggedInId)
      );
      setCurrentUser(foundUser);
      console.log(foundUser);
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
      if (classroomId && classrooms) {
        const foundClassroom = classrooms.find(
          (item) => Number(item.id) === Number(classroomId)
        );
        setCurrentClassroom(foundClassroom);
        console.log("object classroom:", currentClassroom);
      } else {
        setCurrentClassroom(null);
      }
    }
  }, [classrooms, currentUser]);

  //UseEffect for teachers
  useEffect(() => {
    fetch(`http://localhost:4000/teacher`)
      .then((response) => response.json())
      .then((item) => setTeachers(item));
  }, []);

  console.log("Teachers: ", teachers);
  //UseEffect for students
  useEffect(() => {
    fetch(`http://localhost:4000/student`)
      .then((response) => response.json())
      .then((item) => setStudents(item));
  }, []);

  //UseEffect for classrooms
  useEffect(() => {
    setClassrooms(item);
  }, []);
  console.log("Classrooms", classrooms);

  console.log(localStorage.getItem("loggedInId"));
  return (
    <div className="container">
      {currentUser ? (
        <MyContext.Provider
          value={{
            teachers,
            students,
            currentUser,
            setCurrentUser,
            currentClassroom,
            setCurrentClassroom,
            classrooms,
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
