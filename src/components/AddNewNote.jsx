import { useState } from "react";
import { useNotesDispatch } from "../context/noteContext";

const AddNewNote = () => {
  const dispatch = useNotesDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;

    const newNote = {
      title: title.trim(),
      description: description.trim(),
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "add", payload: newNote });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="add-new-note">
      <h2>Add New Note</h2>
      <form className="note-form" onSubmit={submitHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="text-field"
          placeholder="Note title"
          aria-label="Note title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="text-field"
          placeholder="Note description"
          aria-label="Note description"
        />
        <button type="submit" className="btn btn--primary">
          Add New Note
        </button>
      </form>
    </div>
  );
};

export default AddNewNote;
