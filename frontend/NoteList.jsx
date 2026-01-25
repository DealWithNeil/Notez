function NoteList() {
  const notes = [
    "Learn React basics",
    "Practice Tailwind CSS",
    "Build small projects",
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
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
    </div>
  );
}

export default NoteList;
