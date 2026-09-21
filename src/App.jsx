import { useState, useEffect } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";
import NoteProvider from "./context/noteContext";

const THEME_STORAGE_KEY = "note_app_dark_mode";

const NoteAppContent = () => {
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        return JSON.parse(savedTheme);
      }
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
    } catch {
      // ignore
    }
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
  };

  return (
    <div className={`app-wrapper ${isDarkMode ? "dark" : ""}`}>
      <div className="container">
        <NoteHeader
          sortBy={sortBy}
          onSort={(e) => setSortBy(e.target.value)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onOpenMobileAdd={() => setIsMobileFormOpen(true)}
        />

        {isMobileFormOpen && (
          <div
            className="mobile-backdrop"
            onClick={() => setIsMobileFormOpen(false)}
            aria-hidden="true"
          />
        )}

        <main className="note-app">
          <AddNewNote
            isFormOpen={isMobileFormOpen}
            onCloseMobileForm={() => setIsMobileFormOpen(false)}
          />

          <div className="note-container">
            <NoteStatus
              currentFilter={filterStatus}
              onFilterChange={setFilterStatus}
            />
            <NoteList
              sortBy={sortBy}
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              onResetFilters={handleResetFilters}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <NoteProvider>
      <NoteAppContent />
    </NoteProvider>
  );
};

export default App;
