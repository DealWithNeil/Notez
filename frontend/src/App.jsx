import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  // 🔹 Load notes on first render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // 🔹 Save notes whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
  setNotes([
    {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
    },
    ...notes,
  ]);
};

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
  note.text.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <NoteForm onAddNote={addNote} />

      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onEdit={editNote}
      />
    </div>
  );
}

<input
  type="text"
  placeholder="Search notes..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="border p-2 mb-4 rounded w-full max-w-md"
/>


export default App;
