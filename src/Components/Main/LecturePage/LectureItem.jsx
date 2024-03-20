import React, { useState } from "react";
import Modal from "react-modal";
export default function LectureItem(props) {
  const { lecture } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Lecture has been edited", formData);
    closeModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteLecture = () => {};

  return (
    <li>
      <div className="lecture">
        <h4>{lecture.name}</h4>
        <button onClick={openModal} className="view-btn">
          View
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById("root")}
        className="custom-modal"
      >
        <h2>Current Lecture</h2>
        <form>
          <input
            type="text"
            name="name"
            value={lecture.name}
            placeholder="Name"
            onChange={handleInputChange}
          />
          <textarea
            type="textarea"
            name="content"
            value={lecture.description}
            placeholder="Content"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="date"
            value={lecture.startDate}
            placeholder="Date"
            onChange={handleInputChange}
          />
          {lecture.exercises.map((exercise, index) => {
            return (
              <>
              <p>Exercises</p>
              <input
                key={index}
                type="text"
                name={`exercise${index}`}
                value={exercise.name}
                placeholder="Name"
                onChange={handleInputChange}
              />
              <input
                key={index}
                type="text"
                name={`exercise${index}`}
                value={exercise.linkToRepo}
                placeholder="Name"
                onChange={handleInputChange}
              />
              </>
            );
          })}
          <button type="button" onClick={handleSubmit} className="submit-btn">
          Confirm Edit
          </button>
          <button type="button"
          className="delete-btn" onClick={deleteLecture()}>Delete Lecture</button>
          <button
            type="button"
            onClick={closeModal || deleteLecture}
            className="close-btn"
          >
            <span className="close-btn-text">X</span>
          </button>
        </form>
      </Modal>
    </li>
  );
}
