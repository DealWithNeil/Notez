import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  // 1️⃣ Create state for notes
  const [notes, setNotes] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      {/* We'll connect this later */}
      <NoteForm />

      {/* Pass notes to NoteList */}
      <NoteList notes={notes} />
    </div>
  );
}

export default App;
