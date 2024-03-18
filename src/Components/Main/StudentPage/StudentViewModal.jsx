import Modal from "react-modal";
export default function TeacherViewModal({
  isOpen,
  onClose,
  closeModal,
  student,
}) {
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
