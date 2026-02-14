import { useState } from "react";

function NoteList({ notes, onDelete, onEdit, darkMode }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`p-3 rounded shadow flex justify-between items-start
          transition-all duration-300 ease-in-out
          hover:scale-[1.02] hover:shadow-lg
          ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {editingId === note.id ? (
            <div className="flex-1">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={`border p-2 rounded w-full mb-2 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black"
                }`}
              />

              <button
                onClick={() => {
                  onEdit(note.id, editText);
                  setEditingId(null);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                className="text-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <p className="font-medium">{note.text}</p>
            <p className="text-sm text-blue-500 mt-1">
              #{note.category}
            </p>
              <small className="text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </div>
          )}

          {editingId !== note.id && (
            <div className="ml-4 flex gap-2">
              <button
                onClick={() => {
                  setEditingId(note.id);
                  setEditText(note.text);
                }}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(note.id)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
