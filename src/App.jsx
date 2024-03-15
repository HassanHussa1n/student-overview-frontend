import { useState, useEffect, createContext } from "react";
import Login from "./Components/Login";
import Main from "./Components/Main";
import "./App.css";

const MyContext = createContext();
//Seperate context for login
const LoginContext = createContext();
const DUMMY_TEACHERS = [
  { id: 1, name: "Dave" },
  { id: 2, name: "Knut" },
  { id: 3, name: "Hassan" },
  { id: 4, name: "Mads" },
];

function App() {
  //Dummy data for teacher array
  const [teachers, setTeachers] = useState([DUMMY_TEACHERS]);
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
    }
  }, [teachers]);
  return (
    <div>
      {currentUser ? (
        <MyContext.Provider value={{ teachers, currentUser, setCurrentUser }}>
          <Main />
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
