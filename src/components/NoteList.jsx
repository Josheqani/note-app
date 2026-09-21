import { useMemo } from "react";
import {
  DocumentPlusIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useNotes } from "../context/noteContext";
import NoteItem from "./NoteItem";

const NoteList = ({ sortBy, searchQuery, filterStatus, onResetFilters }) => {
  const notes = useNotes();

  const filteredAndSortedNotes = useMemo(() => {
    let result = [...notes];

    // Status filter
    if (filterStatus === "active") {
      result = result.filter((n) => !n.completed);
    } else if (filterStatus === "completed") {
      result = result.filter((n) => n.completed);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.description && n.description.toLowerCase().includes(q)) ||
          (n.category && n.category.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "earliest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "completed") {
        return Number(b.completed) - Number(a.completed);
      }
      if (sortBy === "uncompleted") {
        return Number(a.completed) - Number(b.completed);
      }
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [notes, sortBy, searchQuery, filterStatus]);

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon-wrap">
          <DocumentPlusIcon className="empty-state__icon" />
        </div>
        <h3 className="empty-state__title">No notes yet</h3>
        <p className="empty-state__description">
          Capture your thoughts, ideas, or to-do lists by filling out the form on the left.
        </p>
      </div>
    );
  }

  if (filteredAndSortedNotes.length === 0) {
    if (searchQuery.trim()) {
      return (
        <div className="empty-state">
          <div className="empty-state__icon-wrap">
            <MagnifyingGlassIcon className="empty-state__icon" />
          </div>
          <h3 className="empty-state__title">No matching notes</h3>
          <p className="empty-state__description">
            No notes found matching &ldquo;<strong>{searchQuery}</strong>&rdquo;. Try searching for something else.
          </p>
          {onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="btn btn--secondary btn--sm mt-3"
            >
              Clear Search
            </button>
          )}
        </div>
      );
    }

    if (filterStatus === "completed") {
      return (
        <div className="empty-state">
          <div className="empty-state__icon-wrap">
            <CheckCircleIcon className="empty-state__icon" />
          </div>
          <h3 className="empty-state__title">No completed notes</h3>
          <p className="empty-state__description">
            Complete tasks by checking the checkbox on any active note.
          </p>
        </div>
      );
    }

    if (filterStatus === "active") {
      return (
        <div className="empty-state">
          <div className="empty-state__icon-wrap">
            <CheckCircleIcon className="empty-state__icon" />
          </div>
          <h3 className="empty-state__title">All caught up! 🎉</h3>
          <p className="empty-state__description">
            All your notes are marked as completed. Great job!
          </p>
        </div>
      );
    }
  }

  return (
    <div className="note-list">
      {filteredAndSortedNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
