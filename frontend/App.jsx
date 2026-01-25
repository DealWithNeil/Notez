import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        NoteZ
      </h1>

      <NoteForm />
      <NoteList />
    </div>
  );
}

export default App;
