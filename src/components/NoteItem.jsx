import { useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  CalendarDaysIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import { useNotesDispatch } from "../context/noteContext";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

const NoteItem = ({ note }) => {
  const dispatch = useNotesDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description || "");
  const [editCategory, setEditCategory] = useState(note.category || "General");

  const handleToggle = () => {
    dispatch({ type: "complete", payload: note.id });
  };

  const handleDelete = () => {
    dispatch({ type: "delete", payload: note.id });
  };

  const handleStartEdit = () => {
    setEditTitle(note.title);
    setEditDescription(note.description || "");
    setEditCategory(note.category || "General");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    dispatch({
      type: "edit",
      payload: {
        id: note.id,
        updates: {
          title: editTitle.trim(),
          description: editDescription.trim(),
          category: editCategory,
        },
      },
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSaveEdit(e);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const categoryColors = {
    Work: "category-badge--work",
    Personal: "category-badge--personal",
    Ideas: "category-badge--ideas",
    Study: "category-badge--study",
    General: "category-badge--general",
  };

  const badgeClass = categoryColors[note.category] || categoryColors.General;

  if (isEditing) {
    return (
      <div className="note-item note-item--editing">
        <form onSubmit={handleSaveEdit} onKeyDown={handleKeyDown} className="note-edit-form">
          <div className="edit-form-header">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-field edit-title-input"
              placeholder="Note title"
              autoFocus
              required
              aria-label="Edit note title"
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="category-select"
              aria-label="Edit category"
            >
              <option value="General">General</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Ideas">Ideas</option>
              <option value="Study">Study</option>
            </select>
          </div>

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="text-field text-area edit-desc-input"
            placeholder="Note details..."
            rows={3}
            aria-label="Edit note description"
          />

          <div className="edit-actions">
            <span className="shortcut-hint">Ctrl+Enter to save</span>
            <div className="edit-button-group">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn--secondary btn--sm"
                aria-label="Cancel editing"
              >
                <XMarkIcon className="btn-icon" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={!editTitle.trim()}
                className="btn btn--primary btn--sm"
                aria-label="Save changes"
              >
                <CheckIcon className="btn-icon" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`note-item ${note.completed ? "note-item--completed" : ""}`}>
      <div className="note-item__main">
        <button
          type="button"
          onClick={handleToggle}
          className="btn-checkbox"
          aria-label={note.completed ? "Mark as active" : "Mark as completed"}
          title={note.completed ? "Mark as active" : "Mark as completed"}
        >
          {note.completed ? (
            <CheckCircleSolid className="checkbox-icon checked" />
          ) : (
            <span className="checkbox-custom" />
          )}
        </button>

        <div className="note-item__content">
          <div className="note-item__title-row">
            <h3 className="note-item__title">{note.title}</h3>
            {note.category && (
              <span className={`category-badge ${badgeClass}`}>
                <TagIcon className="badge-icon" />
                {note.category}
              </span>
            )}
          </div>

          {note.description && (
            <p className="note-item__description">{note.description}</p>
          )}

          <div className="note-item__meta">
            <span className="note-item__date" title={new Date(note.createdAt).toLocaleString()}>
              <CalendarDaysIcon className="meta-icon" />
              {formatDate(note.createdAt)}
            </span>
            {note.updatedAt && (
              <span className="note-item__edited-badge">(edited)</span>
            )}
          </div>
        </div>

        <div className="note-item__actions">
          <button
            type="button"
            onClick={handleStartEdit}
            className="action-btn edit-btn"
            aria-label="Edit note"
            title="Edit note"
          >
            <PencilSquareIcon className="action-icon" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="action-btn delete-btn"
            aria-label="Delete note"
            title="Delete note"
          >
            <TrashIcon className="action-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
