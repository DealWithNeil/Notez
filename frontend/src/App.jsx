import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (text) => {
    const newNote = {
      id: Date.now(), // simple unique ID
      text: text,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // 🔑 Delete function
  const deleteNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <NoteForm onAddNote={addNote} />

      {/* pass delete function */}
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}

export default App;
