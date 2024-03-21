import { useState, useEffect, useContext } from "react";
import LectureItem from "./LectureItem";
import Modal from "react-modal";
import { MyContext } from "../../../App";
export default function LecturePage() {
  const { currentClassroom, theClassroomsLectures } = useContext(MyContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [lectures, setLectures] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/lecture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          classroomId: currentClassroom.id,
        }),
      });

      if (response.ok) {
        console.log("Lecture created successfully");
        closeModal();
      } else {
        console.error("Failed to create lecture");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch("http://localhost:4000/lecture", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Got lectures");
          const lecturesData = await response.json();
          setLectures(lecturesData);
        } else {
          console.error("Failed to get lecture");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLectures();
  }, []);
  

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <textarea
            type="textarea"
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            placeholder="Start Date"
            onChange={handleChange}
          />
          <input
            type="text"
            name="endDate"
            value={formData.endDate}
            placeholder="End Date"
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            Create
          </button>
          <button type="button" onClick={closeModal} className="close-btn">
            <span className="close-btn-text">X</span>
          </button>
        </form>
      </Modal>
      <div>
        <div className="lectures-div">
          {currentClassroom ? (
            <ul className="lectures-list">
              {theClassroomsLectures.map((lecture, index) => (
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
