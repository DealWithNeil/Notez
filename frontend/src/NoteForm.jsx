import { useState } from "react";

function NoteForm({ onAddNote }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim() === "") return;

    onAddNote(text);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-4"
    >
      <input
        type="text"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
