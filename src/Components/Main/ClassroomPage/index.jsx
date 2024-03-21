import { useState, useEffect, useContext } from "react";
import ClassroomViewModal from "./ClassroomViewModal.jsx";
import { MyContext } from "../../../App.jsx";
import ClassroomCreateModal from "./ClassroomCreateModal.jsx";
import axios from "axios";

export default function ClassroomPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [updateClassroom, setUpdateClassroom] = useState({});
  const { currentClassroom } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (currentClassroom) {
      setUpdateClassroom({ ...updateClassroom, id: currentClassroom.id });
      axios
        .put(
          `http://localhost:4000/classroom/${currentClassroom.id}`,
          updateClassroom
        )
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
    if (name === "name") {
      setName(value);
      setUpdateClassroom({ ...updateClassroom, name: value });
    }
    if (name === "startDate") {
      setStartDate(value);
      setUpdateClassroom({ ...updateClassroom, startDate: value });
    }
    if (name === "endDate") {
      setEndDate(value);
      setUpdateClassroom({ ...updateClassroom, endDate: value });
    }
  };

  //UseEffect for states
  useEffect(() => {
    if (currentClassroom) {
      setName(currentClassroom.name);
      setStartDate(currentClassroom.startDate);
      setEndDate(currentClassroom.endDate);
    } else {
      setName("");
      setStartDate("");
      setEndDate("");
    }
  }, [currentClassroom]);

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
              id="name"
              className="input-field"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="text"
              id="startDate"
              className="input-field"
              value={startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="text"
              id="endDate"
              className="input-field"
              value={endDate}
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
