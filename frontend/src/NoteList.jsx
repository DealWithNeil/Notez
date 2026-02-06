import { useState } from "react";
const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");
function NoteList({ notes, onDelete, onEdit }) {
  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <li
          key={note.id}
          className="bg-white p-3 rounded shadow flex justify-between items-center"
        >
          <div>
            <p>{note.text}</p>
            <small className="text-gray-500">
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>

          <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 ml-4"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
