import { useState, useEffect, useContext } from "react";
import ClassroomViewModal from "./ClassroomViewModal.jsx";
import { MyContext } from "../../../App.jsx";
import ClassroomCreateModal from "./ClassroomCreateModal.jsx";
import axios from "axios";

export default function ClassroomPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateClassroom, setUpdateClassroom] = useState({
    name: "",
    startDate: "",
    endDate: ""
  });
  const { currentClassroom, currentUser } = useContext(MyContext);

  useEffect(() => {
    if (currentClassroom) {
      setUpdateClassroom({...updateClassroom, name:currentClassroom.name,
      startDate:currentClassroom.startDate,
      endDate:currentClassroom.endDate});
      
    }
  }, [currentClassroom]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentClassroom) {
      axios
        .put(`http://localhost:4000/classroom/${currentClassroom.id}`, {...updateClassroom, teacherId: currentUser.id})
        .then((response) => {
          console.log("Edited classroom: ", response.data);
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating classroom: ", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateClassroom((prevUpdateClassroom) => ({
      ...prevUpdateClassroom,
      [name]: value,
    }));
  };

 

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const createOpenModal = () => {
    setCreateModalOpen(true);
  };
  const createCloseModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className="classroom-page">
      <h1>Edit Classroom</h1>
      <div className="button-container">
        <ClassroomCreateModal
          createIsOpen={createModalOpen}
          createOnClose={() => setCreateModalOpen(false)}
          createCloseModal={createCloseModal}
        />
        <button
          type="button"
          className="create-classroom-btn"
          onClick={createOpenModal}
        >
          Create New
        </button>

        <ClassroomViewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          closeModal={closeModal}
        />
        <button
          type="button"
          className="swap-classroom-btn"
          onClick={openModal}
        >
          Swap Classroom
        </button>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="input-field"
              value={updateClassroom.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="text"
              name="startDate"
              className="input-field"
              value={updateClassroom.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="text"
              name="endDate"
              className="input-field"
              value={updateClassroom.endDate}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="edit-classroom-btn">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
