import Modal from "react-modal";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../App.jsx";
import ClassroomItem from "./ClassroomItem.jsx";
export default function ClassroomViewModal({ isOpen, onClose, closeModal }) {
  const { classrooms, currentUser, currentClassroom } = useContext(MyContext);
  const [userClassrooms, setUserClassrooms] = useState([]);

  useEffect(() => {
    //New list to present the user
    const newList = [];
    for (let i = 0; i < classrooms.length; i++) {
      if (classrooms[i].teacherId === currentUser.id) {
        //Object in the list for presentation
        const classroom = classrooms[i];
        newList.push(classroom);
      }
    }
    setUserClassrooms(newList);
    console.log(userClassrooms);
  }, [classrooms, currentUser]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root")}
    >
      {userClassrooms.length !== 0 ? (
        <div>
          <h3>Classrooms</h3>
          <ul>
            {userClassrooms.map((classroomItem, index) => {
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
        X
      </button>
    </Modal>
  );
}
