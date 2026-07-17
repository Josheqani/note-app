import { useNotes } from "../context/noteContext";
import Message from "./Message";

const NoteStatus = () => {
  const notes = useNotes();
  const allNotes = notes.length;
  const completedNotes = notes.filter((n) => n.completed).length;
  const openNotes = allNotes - completedNotes;

  if (!allNotes) {
    return <Message>No notes have been added yet!</Message>;
  }

  return (
    <ul className="note-status">
      <li>
        All <span>{allNotes}</span>
      </li>
      <li>
        Completed <span>{completedNotes}</span>
      </li>
      <li>
        Open <span>{openNotes}</span>
      </li>
    </ul>
  );
};

export default NoteStatus;
