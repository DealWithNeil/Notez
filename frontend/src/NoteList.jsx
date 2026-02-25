import { useState } from "react";

function NoteList({ notes, onDelete, onToggle, onEdit, darkMode }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const today = new Date().toISOString().split("T")[0];

  return (
    <ul className="space-y-3">
      {notes.map((note) => {
      const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        let dueLabel = null;
        let dueStyle = "opacity-70";

        if (note.dueDate && !note.completed) {
          const dueDateObj = new Date(note.dueDate);
          dueDateObj.setHours(0, 0, 0, 0);

          const diffTime = dueDateObj - todayDate;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 0) {
            dueLabel = `Overdue by ${Math.abs(diffDays)} day${
              Math.abs(diffDays) !== 1 ? "s" : ""
            }`;
            dueStyle = "text-red-600 font-semibold";
          } else if (diffDays === 0) {
            dueLabel = "Due Today";
            dueStyle = "text-orange-500 font-semibold";
          } else {
            dueLabel = `Due in ${diffDays} day${
              diffDays !== 1 ? "s" : ""
            }`;
            dueStyle = "text-yellow-500 font-semibold";
          }
        }

        return (
          <li
            key={note.id}
            className={`p-4 rounded shadow flex justify-between items-start
              transition-all duration-300 ease-in-out
              hover:scale-[1.02] hover:shadow-lg
              ${
                isOverdue
                  ? "border-2 border-red-500 bg-red-50"
                  : darkMode
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
          >
            {/* LEFT SIDE */}
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

                <div className="flex gap-2 items-center mb-2">
                  <p className="text-sm text-blue-500">
                    #{note.category}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      note.priority === "High"
                        ? "bg-red-500 text-white"
                        : note.priority === "Medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {note.priority}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onEdit(note.id, editText);
                      setEditingId(null);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded"
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
              </div>
            ) : (
              <div className="flex-1">
                {/* Text */}
                <p
                  className={`font-medium ${
                    note.completed
                      ? "line-through opacity-60"
                      : ""
                  }`}
                >
                  {note.text}
                </p>

                {/* Category + Priority */}
                <div className="flex gap-2 mt-1 items-center">
                  <p className="text-sm text-blue-500">
                    #{note.category}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      note.priority === "High"
                        ? "bg-red-500 text-white"
                        : note.priority === "Medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {note.priority}
                  </span>
                </div>

                {/* Due Date */}
                {dueLabel && (
                    <p className={`text-sm mt-1 ${dueStyle}`}>
                      {dueLabel}
                    </p>
                  )}
                
                {/* Created Date */}
                <small className="text-gray-500 block mt-1">
                  {new Date(
                    note.createdAt
                  ).toLocaleString()}
                </small>
              </div>
            )}

            {/* RIGHT SIDE ACTIONS */}
            {editingId !== note.id && (
              <div className="ml-4 flex flex-col gap-2 items-end">
                <button
                  onClick={() => onToggle(note.id)}
                  className={`text-sm ${
                    note.completed
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  {note.completed
                    ? "✔ Completed"
                    : "Mark as Done"}
                </button>

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
        );
      })}
    </ul>
  );
}

export default NoteList;