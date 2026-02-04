import { useState } from "react";

function NoteList({ notes, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    onEdit(id, editText);
    setEditingId(null);
  };

  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li
          key={note.id}
          className="flex justify-between items-center bg-white p-2 rounded shadow"
        >
          {editingId === note.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-1 rounded mr-2 flex-1"
              />
              <button
                onClick={() => saveEdit(note.id)}
                className="text-green-600 mr-2"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>{note.text}</span>
              <div>
                <button
                  onClick={() => startEdit(note)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(note.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
