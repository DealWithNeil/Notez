function NoteForm() {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <input
        type="text"
        placeholder="Write a note..."
        className="w-full border p-2 rounded mb-2"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Note
      </button>
    </div>
  );
}

export default NoteForm;
