import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../../App.jsx";

export default function HomePage() {
  const { currentUser, currentClassroom } = useContext(MyContext);
  const [notes, setNotes] = useState([]);
  const [theLecture, setTheLecture] = useState(null);
  console.log(currentUser.notes);

  useEffect(() => {
    const storedNotes = localStorage.getItem(`notes-${currentUser.id}`);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [currentUser]);

  useEffect(() => {
    if (notes.length !== 0) {
      localStorage.setItem(`notes-${currentUser.id}`, JSON.stringify(notes));
    }
  }, [notes, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteText = e.target.note.value.trim();
    if (noteText !== "") {
      setNotes([...notes, noteText]);
      e.target.reset();
    }
  };

  const handleDelete = (index) => {
    if (notes.length === 1) {
      setNotes([]);
      localStorage.removeItem(`notes-${currentUser.id}`);
    } else {
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
    }
  };
  useEffect(() => {
    if (currentClassroom) {
      for (let i = 0; i < currentClassroom.lectures.length; i++) {
        const theStartDate = currentClassroom.lectures[i].startDate;
        const formattedStartDate = theStartDate.replace(/-/g, "");
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        const day = today.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        const thisDate = year + "" + month + "" + day;
        console.log(thisDate);
        if (Number(formattedStartDate) === Number(thisDate)) {
          setTheLecture(currentClassroom.lectures[i]);
        }
      }
    }
  }, [currentClassroom]);

  return (
    <div>
      <h1>
        Hello, {currentUser.firstName} {currentUser.lastName}
      </h1>

      <div>
        <h2>Welcome back! </h2>
        <br></br>
        <div className="lecture-display">
        {theLecture && (
          <div>
            <h3>Todays lecture: {theLecture.name}</h3>
            <p>Description: {theLecture.description}</p>
          </div>
        )}
        {!theLecture && <p>Can't find any lectures for today.</p>}
        </div>
        <br></br>
        <p>
          Hope you are well, {currentUser.firstName}. Inside of this little box,
          you can add your notes for the lectures you will be having today. Feel
          free to add or delete the notes, but make sure to never depend on them
          😊
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <textarea name="note" rows="3" cols="30" className="note-textarea" placeholder="Add a note" />
          <br />
          <button type="submit" className="add-note-btn">
            Add Note
          </button>
        </form>
        <div className="notes-list">
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                <div className="note">
                  <p>{note}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="delete-note-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
