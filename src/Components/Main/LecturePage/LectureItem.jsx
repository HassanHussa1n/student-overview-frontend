import React, { useState } from "react";
import Modal from "react-modal";
export default function LectureItem(props) {
  const { post } = props;
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
    <h4>{post.title}</h4>
    <button onClick={openModal} className="view-btn">View</button>
    </div>
    <Modal isOpen={modalOpen} onRequestClose={closeModal} appElement={document.getElementById("root")}
    className="custom-modal"
    >
      <h2>Fill out the form</h2>
      <form>
        <input
          type="text"
          name="title"
          value={post.title}
          placeholder="Title"
          onChange={handleInputChange}
        />
        <textarea
          type="textarea"
          name="content"
          value={post.content}
          placeholder="Content"
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
        <button type="button" onClick={closeModal || deleteLecture} className="close-btn">
          <span className="close-btn-text">X</span>
        </button>
        
      </form>
    </Modal>
  </li>
)

}
