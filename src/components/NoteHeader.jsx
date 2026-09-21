import {
  MagnifyingGlassIcon,
  XMarkIcon,
  DocumentTextIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useNotes } from "../context/noteContext";

const NoteHeader = ({
  sortBy,
  onSort,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onToggleTheme,
  onOpenMobileAdd,
}) => {
  const notes = useNotes();

  return (
    <header className="note-header">
      <div className="header-brand-wrap">
        <div className="brand-logo">
          <DocumentTextIcon className="brand-icon" />
        </div>
        <div>
          <h1 className="brand-title">Notes</h1>
          <span className="brand-subtitle">
            {notes.length} {notes.length === 1 ? "note" : "notes"} total
          </span>
        </div>
      </div>

      <div className="header-controls">
        <div className="search-bar-wrap">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
            className="search-input"
            aria-label="Search notes"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              <XMarkIcon className="clear-icon" />
            </button>
          )}
        </div>

        <div className="sort-wrap">
          <select
            value={sortBy}
            onChange={onSort}
            aria-label="Sort notes"
            className="sort-select"
          >
            <option value="latest">Latest first</option>
            <option value="earliest">Earliest first</option>
            <option value="completed">Completed first</option>
            <option value="uncompleted">Active first</option>
            <option value="alphabetical">A to Z</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="theme-toggle-btn"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <SunIcon className="theme-icon" /> : <MoonIcon className="theme-icon" />}
        </button>

        <button
          type="button"
          onClick={onOpenMobileAdd}
          className="mobile-add-btn"
          aria-label="Create note"
        >
          <PlusIcon className="btn-icon" />
          <span>New</span>
        </button>
      </div>
    </header>
  );
};

export default NoteHeader;
