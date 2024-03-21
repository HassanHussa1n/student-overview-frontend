import Modal from "react-modal";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "../../../App.jsx";
export default function ClassroomCreateModal({
  createIsOpen,
  createOnClose,
  createCloseModal,
}) {
  const { currentUser, newClassroom, setNewClassroom, setCurrentUser } =
    useContext(MyContext);

  const handleInputChange = (e) => {
    if (e.target.name === "name") {
      setNewClassroom({
        ...newClassroom,
        name: e.target.value,
      });
    }
    if (e.target.name === "startDate") {
      setNewClassroom({
        ...newClassroom,
        startDate: e.target.value,
      });
    }
    if (e.target.name === "endDate") {
      setNewClassroom({
        ...newClassroom,
        endDate: e.target.value,
        teacherId: currentUser.id,
      });
    }
  };

  const handleSubmit = () => {
    //Check if data is filled
    if (
      newClassroom.name.length > 0 &&
      newClassroom.startDate.length > 0 &&
      newClassroom.endDate.length > 0
    ) {
      fetch(`http://localhost:4000/classroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClassroom),
      }).then((newClassroom) => {
        setNewClassroom(newClassroom);
      });

      //Reset the fields
      setNewClassroom({
        ...newClassroom,
        name: "",
        startDate: "",
        endDate: "",
        teacherId: "",
      });
      console.log("Classroom added", newClassroom);
    }
    createCloseModal();
  };
  return (
    <Modal
      isOpen={createIsOpen}
      onRequestClose={createOnClose}
      appElement={document.getElementById("root")}
      className="custom-modal"
    >
      <h2>Create classroom</h2>
      <form>
        <input
          type="text"
          name="name"
          value={newClassroom.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="startDate"
          value={newClassroom.startDate}
          placeholder="Start Date"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="endDate"
          value={newClassroom.endDate}
          placeholder="End Date"
          onChange={handleInputChange}
        />

        <button type="button" onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </form>

      <button onClick={createCloseModal} className="close-btn">
        <span className="close-btn-text">X</span>
      </button>
    </Modal>
  );
}
