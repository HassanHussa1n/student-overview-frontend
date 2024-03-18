import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../../App.jsx";
export default function HomePage() {
  const { currentUser, setCurrentUser } = useContext(MyContext);
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.removeItem("loggedInId");
    navigate(`/`);
    setCurrentUser(null);
  };
  return (
    <div>

      <h1> Hello {currentUser.name} </h1>
      <button onClick={handleSubmit}>Log out</button>

    </div>
  );
}
