import { useContext, useState } from "react";
import { LoginContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import BobsLogo from "../../assets/images/BobsLogo2-transparent.png";

export default function Login() {
  const { setCurrentUser, teachers } = useContext(LoginContext);
  const [id, setId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorBool, setErrorBool] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!teachers.find((useritem) => Number(useritem.id) === Number(id))) {
      //Confirm there is an error finding username
      setErrorMessage("Wrong username or password");
      setErrorBool(true);
    } else {
      setCurrentUser(
        teachers.find((useritem) => Number(useritem.id) === Number(id))
      );
      navigate(`/home/${id}`);
      localStorage.setItem("loggedInId", id);
    }
  };
  return (
    <div className="login-page">
      <div className="login-intro">
        <img src={BobsLogo} alt="BobsLogo" className="bobslogo" />
        <h1>Welcome to Bob's Grading!</h1>
      </div>
      {errorBool && <h3>{errorMessage}</h3>}
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <label htmlFor="first">Write your id</label>
          <input
            type="text"
            id="first"
            name="first"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <label htmlFor="password">Write your password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />

          <input type="submit" value="Login!" />
        </div>
      </form>
    </div>
  );
}
