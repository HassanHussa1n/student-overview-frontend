import { MyContext } from "../../../App.jsx";
import { useContext } from "react";
import StudentItem from "./StudentItem.jsx";

export default function StudentPage() {
  const { currentClassroom } = useContext(MyContext);

  return (
    <>
      <h1>Students</h1>
      <div className="students-list">
      {currentClassroom ? (
        <ul className="student-list">
          {currentClassroom.students.map((student, index) => {
            return <StudentItem student={student} key={index} currentClassroom={currentClassroom}/>;
          })}
        </ul>
      ) : (
        <p>Choose a classroom!</p>
      )}
      </div>
    </>
  );
}
