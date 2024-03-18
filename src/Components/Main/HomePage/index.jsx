import { useContext } from "react";
import { MyContext } from "../../../App.jsx";
export default function HomePage() {
  const { currentUser } = useContext(MyContext);

  return (
    <div>
      <h1> Hello {currentUser.name} </h1>
    </div>
  );
}
