import Modal from "react-modal";
import { useState, useContext } from "react";
import { MyContext } from "../../../App.jsx";
export default function ClassroomCreateModal({
  createIsOpen,
  createOnClose,
  createCloseModal,
}) {
  const [formData, setFormData] = useState({});
  const [newClassroom, setNewClassroom] = useState({
    teacherId: "",
    name: "",
    startDate: "",
    endDate: "",
  });
  const { classrooms, currentUser } = useContext(MyContext);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Classroom added", formData);
    newClassroom.teacherId = currentUser.id;

    createCloseModal();
  };
  return (
    <Modal
      isOpen={createIsOpen}
      onRequestClose={createOnClose}
      appElement={document.getElementById("root")}
    >
      <form>
        <input
          type="text"
          name="name"
          value={newClassroom.name}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </form>

      <button onClick={createCloseModal} className="close-btn">
        X
      </button>
    </Modal>
  );
}
