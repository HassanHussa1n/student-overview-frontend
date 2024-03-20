import Modal from "react-modal";
import React, { useContext } from "react";
import { MyContext } from "../../../App.jsx";
import ClassroomItem from "./ClassroomItem.jsx";
export default function ClassroomViewModal({ isOpen, onClose, closeModal }) {
  const { currentUser } = useContext(MyContext);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root")}
    >
      {currentUser.classrooms ? (
        <div>
          <h3>Classrooms</h3>
          <ul>
            {currentUser.classrooms.map((classroomItem, index) => {
              return (
                <ClassroomItem classroomItem={classroomItem} key={index} />
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}

      <button onClick={closeModal} className="close-btn">
        <span className="close-btn-text">X</span>
      </button>
    </Modal>
  );
}
