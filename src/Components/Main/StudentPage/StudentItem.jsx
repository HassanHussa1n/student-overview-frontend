import { useState } from "react";
import StudentViewModal from "./StudentViewModal.jsx";

export default function StudentItem(props) {
  const [modalOpen, setModalOpen] = useState(false);
  //Selected grade to handle the change of the grade.
  const [updateGrade, setUpdateGrade] = useState({});
  console.log("THIS WILL BE UPDATED?", updateGrade);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <li>
      <div className="student">
        <p>
          {props.student.firstName} {props.student.lastName}
        </p>

        <StudentViewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          student={props.student}
          closeModal={closeModal}
          setUpdateGrade={setUpdateGrade}
          currentClassroom={props.currentClassroom}
        />

        <button className="view-btn" onClick={openModal}>
          View
        </button>
      </div>
    </li>
  );
}
