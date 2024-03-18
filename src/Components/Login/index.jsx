import { useContext } from "react";
import { LoginContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const { setCurrentUser, teachers } = useContext(LoginContext);
  const [id, setId] = useState(0);
  const [error, setError] = useState("Wrong username or password");
  const [errorBool, setErrorBool] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!teachers.find((useritem) => Number(useritem.id) === Number(id))) {
      //Confirm there is an error finding username
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
    <div>
      {errorBool && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="first">Write your id</label>
        <input
          type="text"
          id="first"
          name="first"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />

        <input type="submit" value="Login!" />
      </form>
    </div>
  );
}
