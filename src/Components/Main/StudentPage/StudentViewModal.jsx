import Modal from "react-modal";
import { useState, useEffect } from "react";
import GradeItem from "./GradeItem.jsx";
import axios from "axios";

export default function StudentViewModal({
  isOpen,
  onClose,
  closeModal,
  student,
  currentClassroom,
}) {
  //Retrieve the grades for the student
  const [grades, setGrades] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [editedStudent, setEditedStudent] = useState({ ...student });
  //Selected grade to handle the change of the grade.
  const [updateGrade, setUpdateGrade] = useState({});

  console.log(updateGrade)


  useEffect(() => {
    setGrades(student.evaluations);
  }, [student.evaluations]);

  useEffect(() => {
    //New list to present the user
    const newList = [];
    for (let i = 0; i < grades.length; i++) {
      const exercise = grades[i].exercise;
      if (exercise) {
        //Object in the list for presentation
        const listObject = { ...grades[i], name: exercise.name };
        newList.push(listObject);
      }
    }
    setGradeList(newList);
  }, [grades]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  const saveChanges = () => {
    console.log(currentClassroom.id);
    console.log(grades);
    console.log(editedStudent);
    axios
      .put(`http://localhost:4000/student/${student.id}`, {
        ...editedStudent,
        classroomId: currentClassroom.id,
      })
      .then((response) => {
        console.log("Edited student: ", response.data);
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating student: ", error);
      });

    axios
      .put(`http://localhost:4000/evaluation`, {
        ...updateGrade,
        exerciseId: currentClassroom.id,
      })
      .then((response) => {
        console.log("Edited grade: ", response.data);
        console.log(updateGrade)
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating grade: ", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root")}
      className="custom-modal"
    >
      <h2>
        {student.firstName} {student.lastName}
        {gradeList.length !== 0 ? (
          <div>
            <h4>Exercises</h4>
            <ul>
              {gradeList.map((gradeItem, index) => {
                return (
                  <GradeItem
                    setUpdateGrade={setUpdateGrade}
                    updateGrade={updateGrade}
                    gradeItem={gradeItem}
                    key={index}
                  />
                );
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={editedStudent.firstName || student.firstName} // Autofill with existing data
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={editedStudent.lastName || student.lastName} // Autofill with existing data
        onChange={handleInputChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={editedStudent.email || student.email} // Autofill with existing data
        onChange={handleInputChange}
      />
      <br />
      <button onClick={saveChanges} className="edit-student-btn">
        Save Changes
      </button>
      <button onClick={closeModal} className="close-btn">
        <span className="close-btn-text">X</span>
      </button>
    </Modal>
  );
}
