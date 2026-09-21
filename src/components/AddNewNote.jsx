import { useState } from "react";
import { PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useNotesDispatch } from "../context/noteContext";

const CATEGORIES = ["General", "Personal", "Work", "Ideas", "Study"];

const AddNewNote = ({ isFormOpen, onCloseMobileForm }) => {
  const dispatch = useNotesDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a title for your note.");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "add", payload: newNote });
    setTitle("");
    setDescription("");
    setCategory("General");
    setError("");

    if (onCloseMobileForm) {
      onCloseMobileForm();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      submitHandler(e);
    }
  };

  return (
    <aside className={`add-new-note ${isFormOpen ? "is-open-mobile" : ""}`}>
      <div className="add-new-note__header">
        <div className="header-title-wrap">
          <SparklesIcon className="header-icon" />
          <h2>Add New Note</h2>
        </div>
        {onCloseMobileForm && (
          <button
            type="button"
            onClick={onCloseMobileForm}
            className="mobile-close-btn"
            aria-label="Close note creator"
          >
            ✕
          </button>
        )}
      </div>

      <form className="note-form" onSubmit={submitHandler} onKeyDown={handleKeyDown}>
        <div className="form-group">
          <label htmlFor="note-title" className="form-label">
            Title <span className="required-star">*</span>
          </label>
          <input
            id="note-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            type="text"
            className={`text-field ${error ? "text-field--error" : ""}`}
            placeholder="e.g. Plan weekend trip"
            maxLength={120}
          />
          {error && <p className="form-error-msg">{error}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="note-category" className="form-label">
            Category
          </label>
          <select
            id="note-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select-field"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="note-desc" className="form-label">
            Description
          </label>
          <textarea
            id="note-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-field text-area"
            placeholder="Write note details or thoughts..."
            rows={4}
          />
        </div>

        <div className="form-footer">
          <span className="shortcut-hint">Tip: Press Ctrl + Enter to quickly save</span>
          <button type="submit" className="btn btn--primary btn--full">
            <PlusIcon className="btn-icon" />
            <span>Add Note</span>
          </button>
        </div>
      </form>
    </aside>
  );
};

export default AddNewNote;
