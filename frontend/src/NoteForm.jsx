import { useState } from "react";

function NoteForm({ onAddNote, darkMode }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ERROR: Empty text validation only checks trimmed value but still allows whitespace
    // Better approach: use if (!text.trim()) for clarity
    if (text.trim() === "") return;

    // Pass dueDate now
    onAddNote(text, category, priority, dueDate);

    // Reset all fields
    setText("");
    setCategory("General");
    setPriority("Low");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      {/* Note Text */}
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

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`border p-2 rounded w-full ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Ideas">Ideas</option>
      </select>

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`border p-2 rounded w-full ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={`border p-2 rounded w-full ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;