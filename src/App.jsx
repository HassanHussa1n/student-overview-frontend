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
  //Set currentuser = null if localStorage is not saved(logged out)
  const [currentUser, setCurrentUser] = useState(null);
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

  //UseEffect for teachers
  useEffect(() => {
    fetch(`https://boolean-api-server.fly.dev/knutsr0501/contact`)
      .then((response) => response.json())
      .then((item) => setTeachers(item));
  }, []);

  //UseEffect for students
  useEffect(() => {
    fetch(`https://boolean-api-server.fly.dev/knutsr0501/contact`)
      .then((response) => response.json())
      .then((item) => setStudents(item));
  }, []);

  console.log(localStorage.getItem("loggedInId"));
  return (
    <div className="container">
      {currentUser ? (
        <MyContext.Provider
          value={{ teachers, students, currentUser, setCurrentUser }}
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
