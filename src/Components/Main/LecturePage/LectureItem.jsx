import React, { useState } from "react"
import Modal from 'react-modal';
export default function LectureItem(props) {

const {user} = props 
const [modalOpen, setModalOpen] = useState(false)
const [formData, setFormData] = useState({})

const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    console.log("Lecture has been edited", formData);
    closeModal();
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const deleteLecture = () => {

  }


return (
    <li>
    <h4>{user.title}</h4>
    <button onClick={openModal}>View</button>
    <Modal isOpen={modalOpen} onRequestClose={closeModal}>
      <h2>Fill out the form</h2>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
        />
        <input
          type="textarea"
          name="content"
          placeholder="Content"
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={closeModal}>
          Exit
        </button>
        <button type="button" onClick={deleteLecture}>Delete</button>
      </form>
    </Modal>
  </li>
)

}