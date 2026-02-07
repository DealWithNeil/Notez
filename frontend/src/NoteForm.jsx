import { useState } from "react";

function NoteForm({ onAddNote, darkMode }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    onAddNote(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        className="border p-2 mr-2 rounded w-64"
      />
      <button
        type="submit"
        className={`border p-2 mr-2 rounded w-64 ${
  darkMode
    ? "bg-gray-800 text-white border-gray-600"
    : "bg-white text-black"
}`}

      >
        Add
      </button>
    </form>
  );
}

export default NoteForm;
