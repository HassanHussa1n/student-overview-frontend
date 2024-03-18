import { useContext, useState, useEffect } from "react";
import StudentViewModal from "./StudentViewModal.jsx";

const DUMMY_EXERCISES = [
  {
    lectureId: 1,
    studentId: 4,
    name: "Angular basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
  {
    lectureId: 1,
    studentId: 5,
    name: "Angular basics",
    description: "A cool lecture about a cool language",
    linkToRepo: "http/angular.github.com",
    lastUpdated: "04.03.2024",
  },
];

export default function StudentItem(props) {
  const [exercises, setExercises] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  //UseEffect for exercises
  useEffect(() => {
    setExercises(DUMMY_EXERCISES);
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <li>
      <p>{props.student.lastName}</p>

      <button onClick={openModal}>View</button>
      <StudentViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        student={props.student}
        closeModal={closeModal}
      />

      <button className="view-btn">View</button>

    </li>
  );
}
