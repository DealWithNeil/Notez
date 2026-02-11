import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    setNotes((prev) => [
      {
        id: Date.now(),
        text,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <NoteForm onAddNote={addNote} darkMode={darkMode} />

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`border p-2 mb-4 rounded w-full max-w-md ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      <NoteList
        notes={filteredNotes}
        onDelete={deleteNote}
        onEdit={editNote}
        darkMode={darkMode}
      />
    </div>
  );
}

<h1 className="text-5xl text-red-500 font-bold">
  Tailwind Test
</h1>


export default App;
