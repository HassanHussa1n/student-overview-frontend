import { useState, useEffect, useContext } from "react";
import ClassroomViewModal from "./ClassroomViewModal.jsx";
import { MyContext } from "../../../App.jsx";

export default function ClassroomPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { currentClassroom } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { name, startDate, endDate });
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

  return (
    <div className="classroom-page">
      <h1>Edit Classroom</h1>
      <div className="button-container">
        <button type="submit" className="create-classroom-btn">
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
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="text"
              id="startDate"
              className="input-field"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="text"
              id="endDate"
              className="input-field"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
