import { useState } from "react";
import StudentViewModal from "./StudentViewModal.jsx";

export default function StudentItem(props) {
  
  const [modalOpen, setModalOpen] = useState(false);
 
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <li>
      <div className="student">
      <p>{props.student.lastName}</p>

      <StudentViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        student={props.student}
        closeModal={closeModal}
      />

      <button className="view-btn" onClick={openModal}>
        View
      </button>
      </div>
    </li>
  );
}
