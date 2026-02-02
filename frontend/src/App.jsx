import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  const [notes, setNotes] = useState([]);

  // Function to add a note
  const addNote = (text) => {
    setNotes((prevNotes) => [...prevNotes, text]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      {/* Pass function to NoteForm */}
      <NoteForm onAddNote={addNote} />

      {/* Pass notes to NoteList */}
      <NoteList notes={notes} />
    </div>
  );
}

export default App;
