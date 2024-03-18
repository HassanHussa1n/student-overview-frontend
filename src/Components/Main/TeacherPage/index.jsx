import { MyContext } from "../../../App.jsx";
import { useContext } from "react";
import TeacherItem from "./TeacherItem.jsx";
export default function TeacherPage() {
  const { teachers } = useContext(MyContext);

  return (
    <ul className="teacher-list">
      {teachers.map((teacher, index) => {
        return <TeacherItem teacher={teacher} key={index} />;
      })}
    </ul>
  );
}
