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
      <p className="p-email">Email:</p> 
      <p className="p-emailValue">{teacher.email}</p>

      <p className="p-phone">Phone Number:</p>
      <p className="p-phoneValue">{teacher.phone}</p>
      <p className="p-classroom">Classrooms:</p>
      <ul>
        
      {teacher.classrooms.map((classroom, index) => {
            return (
              <>
            
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
