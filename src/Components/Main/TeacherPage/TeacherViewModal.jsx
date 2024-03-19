import Modal from "react-modal";
export default function TeacherViewModal({
  isOpen,
  onClose,
  closeModal,
  teacher,
}) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>
        {teacher.firstName} {teacher.lastName}
      </h2>
      <p>{teacher.email}</p>

      <button onClick={closeModal} className="close-btn">
        <span className="close-btn-text">X</span>
      </button>
    </Modal>
  );
}
