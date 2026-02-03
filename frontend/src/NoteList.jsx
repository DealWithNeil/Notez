function NoteList({ notes, onDelete }) {
  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li
          key={note.id}
          className="flex justify-between items-center bg-white p-2 rounded shadow"
        >
          <span>{note.text}</span>

          <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
