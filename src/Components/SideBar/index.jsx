import { Link } from "react-router-dom";
import { MyContext } from "../../App.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/BobsLogo2-transparent.png";
export default function SideBar() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { setCurrentUser, currentClassroom, currentUser } =
    useContext(MyContext);

  const handleSubmit = () => {
    localStorage.removeItem("loggedInId");
    navigate(`/`);
    setCurrentUser(null);
  };

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <img src={Logo} alt="Logo" className="logo" />
        </li>
        <li>
          <Link to={`/home/${currentUser.id}`}>
            <p>{currentUser.firstName}</p>
          </Link>
        </li>
        <li>
          <Link to={`/lectures/${currentUser.id}`}>
            <p>Lectures</p>
          </Link>
        </li>
        <li>
          <Link to={`/students/${currentUser.id}`}>
            <p>Students</p>
          </Link>
        </li>
        <li>
          <Link to={`/teachers/${currentUser.id}`}>
            <p>Teachers</p>
          </Link>
        </li>
        <li>
          <Link to={`/classroom/${currentUser.id}`}>
            {currentClassroom ? (
              <p>{currentClassroom.name}</p>
            ) : (
              <p>Classroom</p>
            )}
          </Link>
        </li>
        <li>
          <button onClick={handleSubmit} className="log-out-btn">
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
