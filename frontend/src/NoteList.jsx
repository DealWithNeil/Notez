import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </li>
  );
}

function NoteList({
  notes,
  onDelete,
  onToggle,
  onEdit,
  darkMode,
  setNotes,
}) {
  const handleEdit = (note) => {
    if (!onEdit) return;

    // ERROR: Using globalThis.prompt() is outdated and not accessible in strict mode
    // Better approach: Create a proper React modal/dialog component instead
    // This is a security risk (XSS) and doesn't follow React best practices
    const result = globalThis.prompt("Edit note:", note.text);
    if (result === null) return;

    const newText = result.trim();
    if (!newText || newText === note.text) return;

    onEdit(note.id, newText);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    // ERROR: Using findIndex to look up note indices is inefficient (O(n))
    // Better approach: Create an id-to-index map for O(1) lookup
    // This is repeated twice, making it O(2n) complexity
    const oldIndex = notes.findIndex(
      (n) => n.id === active.id
    );
    const newIndex = notes.findIndex(
      (n) => n.id === over.id
    );

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(
      notes,
      oldIndex,
      newIndex
    );

    setNotes(newOrder);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={notes.map((n) => n.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-3">
          {notes.map((note) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let dueLabel = null;
            let dueStyle = "opacity-70";

            if (note.dueDate && !note.completed) {
              const dueDateObj = new Date(note.dueDate);
              dueDateObj.setHours(0, 0, 0, 0);

              // ERROR: Using Date subtraction returns milliseconds, then Math.ceil() calculation
              // Better approach: Create a dedicated utility function for date comparison
              // This is bug-prone and lacks clarity. Also timezone issues can occur
              const diffTime = dueDateObj - today;
              const diffDays = Math.ceil(
                diffTime / (1000 * 60 * 60 * 24)
              );

              if (diffDays < 0) {
                dueLabel = `Overdue by ${Math.abs(
                  diffDays
                )} day${Math.abs(diffDays) !== 1 ? "s" : ""}`;
                dueStyle = "text-red-600 font-semibold";
              } else if (diffDays === 0) {
                dueLabel = "Due Today";
                dueStyle =
                  "text-orange-500 font-semibold";
              } else {
                dueLabel = `Due in ${diffDays} day${
                  diffDays !== 1 ? "s" : ""
                }`;
                dueStyle =
                  "text-yellow-500 font-semibold";
              }
            }

            return (
              <SortableItem
                key={note.id}
                id={note.id}
              >
                <div
                  className={`p-4 rounded shadow flex justify-between items-start
                  transition-all duration-300 ease-in-out
                  hover:scale-[1.02] hover:shadow-lg
                  ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                >
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        note.completed
                          ? "line-through opacity-60"
                          : ""
                      }`}
                    >
                      {note.text}
                    </p>

                    <div className="flex gap-2 mt-1 items-center">
                      <p className="text-sm text-blue-500">
                        #{note.category}
                      </p>

                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          note.priority === "High"
                            ? "bg-red-500 text-white"
                            : note.priority ===
                              "Medium"
                            ? "bg-yellow-400 text-black"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {note.priority}
                      </span>
                    </div>

                    {dueLabel && (
                      <p
                        className={`text-sm mt-1 ${dueStyle}`}
                      >
                        {dueLabel}
                      </p>
                    )}

                    {note.createdAt && (
                      <small className="text-gray-500 block mt-1">
                        {new Date(note.createdAt).toLocaleString()}
                      </small>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col gap-2 items-end">
                    <button
                      onClick={() =>
                        onToggle(note.id)
                      }
                      // ERROR: Missing aria-label and title attributes for accessibility
                      // Screen readers won't understand what this button does
                      // Should add: aria-label={note.completed ? "Mark as incomplete" : "Mark as complete"}
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
                      onClick={() => handleEdit(note)}
                      className="text-blue-500 text-sm"
                      // ERROR: Missing aria-label attribute
                      // Should add: aria-label={`Edit note: ${note.text}`}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(note.id)
                      }
                      // ERROR: Missing aria-label attribute and poor UX with just "✕"
                      // Should add: aria-label={`Delete note: ${note.text}`}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </SortableItem>
            );
          })}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default NoteList;
