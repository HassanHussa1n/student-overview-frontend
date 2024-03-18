import { MyContext } from "../../../App.jsx";
import { useContext} from "react";
import StudentItem from "./StudentItem.jsx";


export default function StudentPage() {

  const { students } = useContext(MyContext);

  

  return (
    <>
    <h1>Students</h1>
    <ul className="student-list">
      {students.map((student, index) => {
        return (
          <StudentItem student={student} key={index} />
        );
      })}
    </ul>
    </>
  );
}
