import { useNotes, useNotesDispatch } from "../context/noteContext";

const NoteList = ({ sortBy }) => {
  const notes = useNotes();
  
  let sortedNotes = [...notes];
  
  if (sortBy === "latest") {
    sortedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === "earliest") {
    sortedNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortBy === "completed") {
    sortedNotes.sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  return (
    <div className="note-list">
      {sortedNotes.length === 0 ? (
        <p className="no-notes-message">No notes yet. Add your first note!</p>
      ) : (
        sortedNotes.map((note) => <NoteItem key={note.id} note={note} />)
      )}
    </div>
  );
};

export default NoteList;

const NoteItem = ({ note }) => {
  const dispatch = useNotesDispatch();
  
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handleDelete = () => {
    dispatch({ type: "delete", payload: note.id });
  };

  const handleComplete = () => {
    dispatch({ type: "complete", payload: note.id });
  };

  return (
    <div className={`note-item ${note.completed ? "completed" : ""}`}>
      <div className="note-item__header">
        <div className="note-item__content">
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button
            onClick={handleComplete}
            className="btn-complete"
            aria-label={note.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <input
              type="checkbox"
              checked={note.completed}
              onChange={handleComplete}
              aria-label="Toggle completion status"
            />
          </button>
          <button
            onClick={handleDelete}
            className="btn-delete"
            aria-label="Delete note"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="trash-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", options)}
      </div>
    </div>
  );
};
