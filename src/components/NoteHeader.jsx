import { useNotes } from "../context/noteContext";

const NoteHeader = ({ sortBy, onSort }) => {
  const notes = useNotes();

  return (
    <div className="note-header">
      <h1>My Notes ({notes.length})</h1>
      <select value={sortBy} onChange={onSort} aria-label="Sort notes">
        <option value="latest">Latest Notes</option>
        <option value="earliest">Earliest Notes</option>
        <option value="completed">Completed Status</option>
      </select>
    </div>
  );
};

export default NoteHeader;
