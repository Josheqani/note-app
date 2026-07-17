import React, { useContext, useReducer } from "react";

const NotesContext = createContext(null);
const NotesDispatchContext = createContext(null);

const noteReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((n) => n.id !== action.payload);
    case "complete":
      return state.map((note) =>
        note.id === action.payload
          ? { ...note, completed: !note.completed }
          : note
      );
    default:
      throw new Error("Sorry, this action does not exist: " + action.type);
  }
};

export default function NoteProvider({ children }) {
  const [notes, dispatch] = useReducer(noteReducer, []);
  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
}

export function useNotesDispatch() {
  const context = useContext(NotesDispatchContext);
  if (!context) {
    throw new Error("useNotesDispatch must be used within a NoteProvider");
  }
  return context;
}
