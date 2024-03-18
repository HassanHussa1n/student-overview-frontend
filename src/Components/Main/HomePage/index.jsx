import { useState, useContext } from "react";
import { MyContext } from "../../../App.jsx";

export default function HomePage() {
  const { currentUser } = useContext(MyContext);
  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteText = e.target.note.value.trim();
    if (noteText !== "") {
      setNotes([...notes, noteText]);
      e.target.reset();
    }
  };

  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h1>
        Hello, {currentUser.firstName} {currentUser.lastName}
      </h1>

      <div className="notes">
        <h2>Look who's back! </h2>
        <p>
          Hope you are well, {currentUser.firstName}. Inside of this little
          div, you can add your notes for the lectures you will be having
          today. Feel free to add or delete the notes, but make sure to never
          depend on them 😊
        </p>
        
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <textarea name="note" rows="3" cols="30" placeholder="Add a note" />
          <br />
          <button type="submit" className="add-note-btn">Add Note</button>
        </form>
        <div className="notes-list">
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
             <p> {note} </p>

              <button onClick={() => handleDelete(index)}className="delete-note-btn">Delete</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
