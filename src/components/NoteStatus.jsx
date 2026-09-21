import { useNotes, useNotesDispatch } from "../context/noteContext";

const NoteStatus = ({ currentFilter, onFilterChange }) => {
  const notes = useNotes();
  const dispatch = useNotesDispatch();

  const allNotesCount = notes.length;
  const completedNotesCount = notes.filter((n) => n.completed).length;
  const activeNotesCount = allNotesCount - completedNotesCount;

  const completionPercentage =
    allNotesCount > 0
      ? Math.round((completedNotesCount / allNotesCount) * 100)
      : 0;

  const handleClearCompleted = () => {
    if (window.confirm("Are you sure you want to delete all completed notes?")) {
      dispatch({ type: "clearCompleted" });
    }
  };

  if (allNotesCount === 0) {
    return null;
  }

  return (
    <div className="note-status-container">
      <div className="note-status-nav">
        <ul className="note-status-tabs" role="tablist">
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={currentFilter === "all"}
              onClick={() => onFilterChange("all")}
              className={`status-tab ${currentFilter === "all" ? "status-tab--active" : ""}`}
            >
              <span>All</span>
              <span className="badge">{allNotesCount}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={currentFilter === "active"}
              onClick={() => onFilterChange("active")}
              className={`status-tab ${currentFilter === "active" ? "status-tab--active" : ""}`}
            >
              <span>Active</span>
              <span className="badge badge--active">{activeNotesCount}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={currentFilter === "completed"}
              onClick={() => onFilterChange("completed")}
              className={`status-tab ${currentFilter === "completed" ? "status-tab--active" : ""}`}
            >
              <span>Completed</span>
              <span className="badge badge--completed">{completedNotesCount}</span>
            </button>
          </li>
        </ul>

        {completedNotesCount > 0 && (
          <button
            type="button"
            onClick={handleClearCompleted}
            className="btn-clear-completed"
            title="Delete all completed notes"
          >
            Clear completed
          </button>
        )}
      </div>

      <div className="progress-section">
        <div className="progress-label-row">
          <span className="progress-label">Completion progress</span>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div className="progress-bar-track" aria-hidden="true">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteStatus;
