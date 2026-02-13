import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  // ✅ Load dark mode from localStorage on first render
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Load notes from localStorage
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save notes when they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ✅ Save dark mode when it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addNote = (text, category) => {
  setNotes((prev) => [
    {
      id: Date.now(),
      text,
      category,
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

      const filteredNotes = notes.filter((note) => {
      const matchesSearch = note.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        note.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });


  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`mb-6 px-4 py-2 rounded-lg font-medium transition ${
          darkMode
            ? "bg-yellow-400 text-black hover:bg-yellow-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
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

export default App;
