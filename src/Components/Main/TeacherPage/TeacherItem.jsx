import { useState } from "react";
import TeacherViewModal from "./TeacherViewModal.jsx";

export default function TeacherItem(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <li>
      <p>{props.teacher.firstName}</p>
      <button onClick={openModal}className="view-btn">View</button>
      <TeacherViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        teacher={props.teacher}
        closeModal={closeModal}
      />
    </li>
  );
}
