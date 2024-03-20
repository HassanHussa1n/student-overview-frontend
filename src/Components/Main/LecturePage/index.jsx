import { useState, useEffect, useContext } from "react";
import LectureItem from "./LectureItem";
import Modal from "react-modal";
import { MyContext } from "../../../App";
export default function LecturePage() {
  const { currentClassroom } = useContext(MyContext);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const createNewLecture = () => {};

  return (
    <>
      <div className="lectures-header">
        <h1>Lectures</h1>
        <button className="create-btn" onClick={openModal}>
          Create New
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById("root")}
        className="custom-modal"
      >
        <h2>Create Lecture</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            
          />
          <textarea
            type="textarea"
            name="description"
            placeholder="Description"
            
          />
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date"
            
          />
          <button
            type="button"
            onClick={createNewLecture}
            className="submit-btn"
          >
            Create
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="close-btn"
          >
            <span className="close-btn-text">X</span>
          </button>
        </form>
      </Modal>
      <div>
        <div className="lectures-div">
          {currentClassroom ? (
            <ul className="lectures-list">
              {currentClassroom.lectures.map((lecture, index) => (
                <LectureItem lecture={lecture} key={index} />
              ))}
            </ul>
          ) : (
            <p>Choose a classroom!</p>
          )}
        </div>
      </div>
    </>
  );
}
