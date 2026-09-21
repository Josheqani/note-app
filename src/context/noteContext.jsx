import { createContext, useContext, useReducer, useEffect } from "react";

const NotesContext = createContext(null);
const NotesDispatchContext = createContext(null);

const STORAGE_KEY = "note_app_items_v1";

const defaultNotes = [
  {
    id: 1,
    title: "Welcome to Note App! 👋",
    description: "Capture thoughts, organize tasks by category, search instantly, and toggle dark mode.",
    category: "Personal",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Fully Responsive & Mobile-friendly 📱",
    description: "Adaptive layout optimized for phones, tablets, and desktop computers with touch controls.",
    category: "Work",
    completed: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

const initNotes = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return defaultNotes;
  } catch (err) {
    console.error("Failed to load notes from localStorage:", err);
    return [];
  }
};

const noteReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];
    case "delete":
      return state.filter((n) => n.id !== action.payload);
    case "complete":
      return state.map((note) =>
        note.id === action.payload
          ? { ...note, completed: !note.completed }
          : note
      );
    case "edit":
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, ...action.payload.updates, updatedAt: new Date().toISOString() }
          : note
      );
    case "clearCompleted":
      return state.filter((note) => !note.completed);
    default:
      throw new Error("Sorry, this action does not exist: " + action.type);
  }
};

export default function NoteProvider({ children }) {
  const [notes, dispatch] = useReducer(noteReducer, [], initNotes);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
      console.error("Failed to save notes to localStorage:", err);
    }
  }, [notes]);

  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};

export const useNotesDispatch = () => {
  const context = useContext(NotesDispatchContext);
  if (!context) {
    throw new Error("useNotesDispatch must be used within a NoteProvider");
  }
  return context;
};


