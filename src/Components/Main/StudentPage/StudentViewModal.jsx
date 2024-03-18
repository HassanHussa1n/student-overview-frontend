import Modal from "react-modal";
import { useContext, useState, useEffect } from "react";

const DUMMY_EXERCISES = [
  {
    lectureId: 1,
    studentId: 4,
    name: "Angular basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
  {
    lectureId: 1,
    studentId: 5,
    name: "Angular basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
];

const DUMMY_GRADES = [
  { id: 1, exerciseId: 2, studentId: 4, grade: 2, lastUpdated: "04.03.2024" },
  { id: 2, exerciseId: 1, studentId: 4, grade: 2, lastUpdated: "04.03.2024" },
  { id: 3, exerciseId: 2, studentId: 3, grade: 2, lastUpdated: "04.03.2024" },
];

export default function TeacherViewModal({
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
    //Object in the list for presentation
    const gradeObject = {};
    for (let i = 0; i < grades.length; i++) {
        if(grades[i].studentId = student.id ){
            
        }
      }


    setGrades(newList);
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>
        {student.firstName} {student.lastName}
      </h2>

      <button onClick={closeModal} className="close-btn">
        X
      </button>
    </Modal>
  );
}
