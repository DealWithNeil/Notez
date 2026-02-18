import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  // Load dark mode from localStorage on first render
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  const [noteToDelete, setNoteToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load notes from localStorage
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Save notes when they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Save dark mode when it changes
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
      completed: false,
    },
    ...prev,
  ]);
};


  const deleteNote = (id) => {
  setNoteToDelete(id);
};

  const confirmDelete = () => {
    setNotes((prev) =>
      prev.filter((note) => note.id !== noteToDelete)
    );
    setNoteToDelete(null);
  };

  const cancelDelete = () => {
    setNoteToDelete(null);
  };


  const editNote = (id, newText) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  // Stats (OUTSIDE filter)
const totalNotes = notes.length;
const completedNotes = notes.filter((note) => note.completed).length;
const remainingNotes = totalNotes - completedNotes;
const completionRate =
  totalNotes === 0
    ? 0
    : Math.round((completedNotes / totalNotes) * 100);

      <div className="mb-6">
  <div className="flex justify-between mb-1 text-sm">
    <span>Progress</span>
    <span>{completionRate}%</span>
  </div>

  <div
    className={`w-full h-3 rounded-full ${
      darkMode ? "bg-gray-700" : "bg-gray-300"
    }`}
  >
    <div
      className="h-3 rounded-full bg-green-500 transition-all duration-500"
      style={{ width: `${completionRate}%` }}
    />
  </div>
</div>


// Filtering logic
const filteredNotes = notes.filter((note) => {
  const matchesSearch = note.text
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    note.category === selectedCategory;

  return matchesSearch && matchesCategory;
});


const toggleComplete = (id) => {
  setNotes((prev) =>
    prev.map((note) =>
      note.id === id
        ? { ...note, completed: !note.completed }
        : note
    )
  );
};

  return (
    <>
      {noteToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded shadow-lg w-80 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">
              Delete this note?
            </h2>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-3 py-1 rounded bg-gray-400 text-white"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-3 py-1 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
      
      <div
  className={`grid grid-cols-3 gap-4 mb-6 text-center ${
    darkMode ? "text-gray-200" : "text-gray-800"
  }`}
>
  <div className="p-3 rounded bg-blue-500 text-white shadow">
    <p className="text-lg font-bold">{totalNotes}</p>
    <p className="text-sm">Total</p>
  </div>

  <div className="p-3 rounded bg-green-500 text-white shadow">
    <p className="text-lg font-bold">{completedNotes}</p>
    <p className="text-sm">Completed</p>
  </div>

  <div className="p-3 rounded bg-yellow-500 text-white shadow">
    <p className="text-lg font-bold">{remainingNotes}</p>
    <p className="text-sm">Remaining</p>
  </div>
</div>

      <NoteForm onAddNote={addNote} darkMode={darkMode} />

      <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className={`border p-2 mb-4 rounded w-full max-w-md ${
        darkMode
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-black"
      }`}
    >
      <option value="All">All Categories</option>
      <option value="General">General</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Ideas">Ideas</option>
    </select>


      <NoteList
      notes={filteredNotes}
      onDelete={deleteNote}
      onEdit={editNote}
      onToggle={toggleComplete}
      darkMode={darkMode}
/>

    </div>
    </>
  );
}

export default App;
