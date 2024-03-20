import Modal from "react-modal";
export default function TeacherViewModal({
  isOpen,
  onClose,
  closeModal,
  teacher,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root")}
      className="custom-modal"
    >
      <h2>
        {teacher.firstName} {teacher.lastName}
      </h2>
      <p>Email: {teacher.email}</p>
      <p>Phone Number: {teacher.phone}</p>
      <ul>
      {teacher.classrooms.map((classroom, index) => {
            return (
              <>
              <p>Classrooms</p>
            
              <li
                key={index}
                type="text"
                name={`classroom${index}`}
              >{classroom.name}</li>
              </>
            );
          })}
        </ul>

      <button onClick={closeModal} className="close-btn">
        <span className="close-btn-text">X</span>
      </button>
    </Modal>
  );
}
