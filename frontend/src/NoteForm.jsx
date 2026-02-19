import { useState } from "react";

function NoteForm({ onAddNote, darkMode }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Low");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    onAddNote(text, category);
    setText("");
    setCategory("General");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        className={`border p-2 rounded w-full ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`border p-2 rounded w-full ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      >
        <option>General</option>
        <option>Work</option>
        <option>Personal</option>
        <option>Ideas</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
