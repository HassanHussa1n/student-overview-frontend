import Modal from "react-modal";
import { useState, useEffect } from "react";
import GradeItem from "./GradeItem.jsx";
const DUMMY_EXERCISES = [
  {
    id: 1,
    lectureId: 1,
    studentId: 4,
    name: "Angular basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
  {
    id: 2,
    lectureId: 1,
    studentId: 5,
    name: "REACT basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
  {
    id: 3,
    lectureId: 1,
    studentId: 5,
    name: "JAVA basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
  {
    id: 4,
    lectureId: 1,
    studentId: 5,
    name: ".Net basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
  {
    id: 5,
    lectureId: 1,
    studentId: 5,
    name: "Python basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
  {
    id: 6,
    lectureId: 1,
    studentId: 5,
    name: "Database basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
];

const DUMMY_GRADES = [
  { id: 1, exerciseId: 2, studentId: 4, grade: 2, lastUpdated: "04.03.2024" },
  { id: 2, exerciseId: 1, studentId: 4, grade: 2, lastUpdated: "04.03.2024" },
  { id: 3, exerciseId: 2, studentId: 3, grade: 2, lastUpdated: "04.03.2024" },
  { id: 4, exerciseId: 3, studentId: 3, grade: 2, lastUpdated: "04.03.2024" },
  { id: 5, exerciseId: 4, studentId: 3, grade: 2, lastUpdated: "04.03.2024" },
  { id: 6, exerciseId: 6, studentId: 3, grade: 2, lastUpdated: "04.03.2024" },
  { id: 7, exerciseId: 5, studentId: 3, grade: 2, lastUpdated: "04.03.2024" },
];

export default function StudentViewModal({
  isOpen,
  onClose,
  closeModal,
  student,
}) {
  //const { exercises,grades } = useContext(MyContext);
  //Retrieve the grades for the student
  const [exercises, setExercises] = useState([]);
  const [grades, setGrades] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  //UseEffect for exercises
  useEffect(() => {
    setExercises(DUMMY_EXERCISES);
  }, []);
  useEffect(() => {
    setGrades(DUMMY_GRADES);
  }, []);

  useEffect(() => {
    //New list to present the user
    const newList = [];

    for (let i = 0; i < grades.length; i++) {
      const exercise = exercises.find(
        (item) => Number(item.id) === Number(grades[i].exerciseId)
      );
      if (exercise) {
        if (grades[i].studentId === student.id) {
          //Object in the list for presentation
          const gradeObject = { name: exercise.name, grade: grades[i].grade };
          newList.push(gradeObject);
        }
      }
    }
    setGradeList(newList);
  }, [student]);
  const grade = gradeList[1];
  console.log(gradeList);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root")}
    >
      <h2>
        {student.firstName} {student.lastName}
        {gradeList.length !== 0 ? (
          <div>
            <h3>Exercises</h3>
            <ul>
              {gradeList.map((gradeItem, index) => {
                return <GradeItem gradeItem={gradeItem} key={index} />;
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </h2>

      <button onClick={closeModal} className="close-btn">
        X
      </button>
    </Modal>
  );
}
