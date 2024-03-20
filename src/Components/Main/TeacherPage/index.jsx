import { MyContext } from "../../../App.jsx";
import { useContext } from "react";
import TeacherItem from "./TeacherItem.jsx";
export default function TeacherPage() {
  const { teachers } = useContext(MyContext);

  return (
    <>
    <h1>Teachers</h1>
    <div className="teachers-list">
    <ul className="teacher-list">
      {teachers.map((teacher, index) => {
        return <TeacherItem teacher={teacher} key={index} />;
      })}
    </ul>
    </div>
    </>
  );
}
