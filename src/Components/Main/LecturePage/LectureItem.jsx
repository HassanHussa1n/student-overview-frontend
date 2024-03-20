import React, { useState, useContext } from "react";
import { MyContext } from "../../../App";
import Modal from "react-modal";
import NewExerciseModal from "./NewExerciseModal";
export default function LectureItem(props) {
  const { currentClassroom } = useContext(MyContext);
  const { lecture } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editedLecture, setEditedLecture] = useState({
    classroomId: currentClassroom.id,
    name: lecture.name,
    description: lecture.description,
    startDate: lecture.startDate,
    endDate: lecture.endDate,
    exercises: lecture.exercises
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("exerciseName")) {
      const updatedExercises = [...editedLecture.exercises];
      updatedExercises[index].name = value;
      setEditedLecture({ ...editedLecture, exercises: updatedExercises });
    } else if (name.startsWith("exerciseLink")) {
      const updatedExercises = [...editedLecture.exercises];
      updatedExercises[index].linkToRepo = value;
      setEditedLecture({ ...editedLecture, exercises: updatedExercises });
    } else {
      setEditedLecture({ ...editedLecture, [name]: value });
    }
  };

  console.log(lecture)
  const handleSubmit = async () => {
    console.log(JSON.stringify(editedLecture))
    
    try {
      const response = await fetch(`http://localhost:4000/lecture/${lecture.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedLecture),
      });

      if (response.ok) {
        console.log("Lecture updated successfully: ", lecture);
        closeModal();
      } else {
        console.error("Failed to update lecture", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

  const deleteLecture = async () => {
    try {
      const response = await fetch(`http://localhost:4000/lecture/${lecture.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Lecture deleted successfully, at: ", `http://localhost:4000/lecture/${lecture.id}`);
        closeModal();
      } else {
        console.error("Failed to delete lecture, at: ", `http://localhost:4000/lecture/${lecture.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <li>
      <div className="lecture">
        <h4>{lecture.name}</h4>
        <button onClick={openModal} className="view-btn">
          View
        </button>
        <button onClick={createOpenModal} className="view-btn">
          Add exercise
        </button>
        <NewExerciseModal
          createIsOpen={createModalOpen}
          createOnClose={() => setCreateModalOpen(false)}
          createCloseModal={createCloseModal}
          lecture={lecture}
        />
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
            value={editedLecture.name}
            placeholder="Name"
            onChange={handleInputChange}
          />
          <textarea
            type="textarea"
            name="description"
            value={editedLecture.description}
            placeholder="Description"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="startDate"
            value={editedLecture.startDate}
            placeholder="Start Date"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="endDate"
            value={editedLecture.endDate}
            placeholder="End Date"
            onChange={handleInputChange}
          />
          {editedLecture.exercises.map((exercise, index) => {
  return (
    <div key={index}>
      <p>Exercise {index + 1}</p>
      <input
        type="text"
        name={`exerciseName${index}`}
        value={exercise.name}
        placeholder="Name"
        onChange={(e) => handleInputChange(e, index)}
      />
      <input
        type="text"
        name={`exerciseLink${index}`}
        value={exercise.linkToRepo}
        placeholder="Link to Repo"
        onChange={(e) => handleInputChange(e, index)}
      />
    </div>
  );
})}

          <button type="button" onClick={handleSubmit} className="submit-btn">
            Confirm Edit
          </button>
          
          <button type="button"
          className="delete-btn" onClick={deleteLecture}>Delete Lecture</button>

          <button
            type="button"
            onClick={closeModal}
            className="close-btn"
          >
            <span className="close-btn-text">X</span>
          </button>
        </form>
      </Modal>
    </li>
  );
}