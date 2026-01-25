function NoteList({ notes }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center">
          No notes yet
        </p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li
              key={index}
              className="border p-2 rounded"
            >
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;
