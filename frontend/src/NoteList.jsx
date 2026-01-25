function NoteList({ notes }) {
  return (
    <ul className="list-disc pl-5">
      {notes.map((note, index) => (
        <li key={index} className="mb-2">
          {note}
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
