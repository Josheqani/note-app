# Note App 📝

A fast, responsive, and modern note-taking web application built with **React 19**, **Vite 8**, and **Heroicons**.

---

## ✨ Features

- **📱 Fully Responsive Design**: Seamless adaptive layout across mobile phones, tablets, and desktops. Includes a mobile slide-up bottom sheet for quick note adding.
- **💾 LocalStorage Persistence**: Notes and theme preferences are automatically saved in browser storage.
- **🌓 Light & Dark Theme**: Built-in sleek dark mode toggle that respects system preferences and persists selection.
- **🔍 Real-Time Search**: Instant fuzzy search across note titles, descriptions, and categories.
- **🏷️ Categories & Tags**: Organize notes into Work, Personal, Ideas, Study, and General categories with distinctive color badges.
- **✏️ Inline Note Editing**: Click the edit button to modify note title, category, or description on the fly with keyboard shortcuts (`Ctrl/Cmd + Enter` to save, `Esc` to cancel).
- **📊 Task Tracking & Stats**: Interactive filter tabs (All / Active / Completed), completion percentage progress bar, and "Clear Completed" shortcut.
- **🔄 Flexible Sorting**: Sort notes by Latest First, Earliest First, Completed First, Active First, or Alphabetical (A–Z).
- **♿ Accessible & Modern**: Semantic HTML5 elements, ARIA labels, accessible focus rings, and clean touch targets.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Icons**: [@heroicons/react](https://heroicons.com/)
- **Styling**: Pure Modern CSS (CSS Variables, Flexbox, CSS Grid, Media Queries)
- **CI/CD**: GitHub Actions (Node 20 LTS, automated GitHub Pages deployment)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Josheqani/note-app.git

# Navigate to the project directory
cd note-app

# Install dependencies
npm install
```

### Development

Run the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Production Build

Create an optimized production build in the `dist` directory:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Code Quality & Linting

Run ESLint to check for syntax and style issues:

```bash
npm run lint
```

---

## 📂 Project Structure

```text
note-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── components/
│   │   ├── AddNewNote.jsx      # Note creation form with validation & shortcuts
│   │   ├── Message.jsx         # Status banner component
│   │   ├── NoteHeader.jsx      # Top header with search, sort & dark mode toggle
│   │   ├── NoteItem.jsx        # Note card with inline edit, delete & completion
│   │   ├── NoteList.jsx        # Filtered & sorted notes list with empty states
│   │   └── NoteStatus.jsx      # Interactive status filter tabs & progress bar
│   ├── context/
│   │   └── noteContext.jsx     # Context provider with localStorage sync & reducer
│   ├── App.css                 # Responsive application styles & layout
│   ├── App.jsx                 # Main application state & shell
│   ├── index.css               # Design tokens, themes (light/dark), and resets
│   └── main.jsx                # Application entry point
├── index.html                  # HTML template with metadata
├── package.json                # Project dependencies and scripts
└── vite.config.js              # Vite configuration
```

---

## 📄 License

MIT License. Feel free to use this project for personal and commercial purposes.
