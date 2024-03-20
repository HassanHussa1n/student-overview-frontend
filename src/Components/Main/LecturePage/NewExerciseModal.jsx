import Modal from "react-modal";
import { useState } from "react";
export default function NewExerciseModal({
  createIsOpen,
  createOnClose,
  createCloseModal,
  lecture,
}) {
  const [newExercise, setNewExercise] = useState({
    lectureId: "",
    description: "",
    linkToRepo: "",
    name: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === "name") {
      setNewExercise({
        ...newExercise,
        name: e.target.value,
      });
    }
    if (e.target.name === "description") {
      setNewExercise({
        ...newExercise,
        description: e.target.value,
      });
    }
    if (e.target.name === "link") {
      setNewExercise({
        ...newExercise,
        linkToRepo: e.target.value,
        lectureId: lecture.id,
      });
      console.log(newExercise);
    }
  };

  const handleSubmit = () => {
    //Check if data is filled
    if (
      newExercise.name.length > 0 &&
      newExercise.description.length > 0 &&
      newExercise.linkToRepo.length > 0
    ) {
      fetch(`http://localhost:4000/exercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExercise),
      });

      //Reset the fields
      setNewExercise({
        ...newExercise,
        lectureId: "",
        description: "",
        linkToRepo: "",
        name: "",
      });
      console.log("Exercise added", newExercise);
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
      <h2>Create exercise</h2>
      <form>
        <input
          type="text"
          name="name"
          value={newExercise.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <textarea
          type="textarea"
          name="description"
          value={newExercise.description}
          placeholder="Description"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="link"
          value={newExercise.linkToRepo}
          placeholder="Link to repository"
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
