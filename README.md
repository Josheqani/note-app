<div align="center">

# 📝 Note App

**A blazing fast, responsive, and elegant note-taking web application built with modern web technologies.**

[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-12.4.1-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

[Live Demo](#-getting-started) • [Key Features](#-key-features) • [Keyboard Shortcuts](#-keyboard-shortcuts) • [Architecture](#-architecture--state-management) • [Project Structure](#-project-structure)

</div>

---

## 📖 Overview

**Note App** is designed for speed, simplicity, and flexibility. Whether you are capturing fleeting thoughts, organizing personal goals, or tracking work tasks, this application provides an intuitive workflow that adapts seamlessly to phones, tablets, and desktop workstations.

Built from the ground up with **React 19**, **Vite 8**, and **Heroicons**, it operates entirely client-side with zero latency and automatic offline persistence using `localStorage`.

---

## ✨ Key Features

### 📱 Responsive Mobile-First Experience
- **Desktop (960px+)**: Dual-column layout featuring an ergonomically sticky note creator on the left and a searchable, filterable grid on the right.
- **Tablet (680px - 960px)**: Adaptive single-column view with collapsible quick-controls.
- **Mobile (<680px)**: Dedicated slide-up drawer for adding notes, blur backdrop, touch targets exceeding 44px, and clean floating navigation.

### 🔍 Real-Time Search & Multi-Criteria Filtering
- **Instant Search**: Type in the search bar for zero-latency fuzzy filtering across titles, note bodies, and category tags.
- **Status Filter Tabs**: Switch between **All**, **Active**, and **Completed** notes with live count badges.
- **Flexible Sorting**: Sort notes dynamically:
  - 🕒 **Latest first**
  - ⏳ **Earliest first**
  - ✅ **Completed first**
  - ⭕ **Active first**
  - 🔤 **Alphabetical (A–Z)**

### 🌓 First-Class Dark & Light Themes
- Smooth transitions between light and dark modes.
- Automatic detection of your operating system's `prefers-color-scheme`.
- Seamless persistence of your theme choice in `localStorage`.
- Comprehensive design tokens with balanced contrast ratios for visual comfort.

### 🏷️ Categorization & Tags
- Organize notes into predefined, color-coded categories:
  - 💼 **Work** (Indigo)
  - 🌿 **Personal** (Emerald)
  - 💡 **Ideas** (Amber)
  - 📚 **Study** (Purple)
  - 📌 **General** (Slate)

### ✏️ Inline Editing
- Edit note content right in place without disturbing your workspace or navigating to another page.
- Modify the title, category, and multi-line body simultaneously.
- Automatic relative timestamps (`Just now`, `10m ago`, `Yesterday`, etc.) with `(edited)` indicator.

### 📊 Task Progress Tracking
- Live **completion percentage progress bar** that dynamically recalculates as notes are checked off.
- **Clear Completed** bulk action with confirmation to clean up finished tasks quickly.

### 💾 Zero-Config Local Storage
- Notes and preferences are saved directly in your browser's `localStorage`.
- Works completely offline without requiring accounts, logins, or external databases.

---

## ⌨️ Keyboard Shortcuts

Speed up your workflow using built-in keyboard shortcuts:

| Action | Shortcut | Context |
| :--- | :--- | :--- |
| **Quick Add Note** | <kbd>Ctrl</kbd> + <kbd>Enter</kbd> / <kbd>Cmd</kbd> + <kbd>Enter</kbd> | Inside the Add Note form |
| **Save Inline Edit** | <kbd>Ctrl</kbd> + <kbd>Enter</kbd> / <kbd>Cmd</kbd> + <kbd>Enter</kbd> | While editing any note |
| **Cancel Inline Edit** | <kbd>Esc</kbd> | While editing any note |
| **Field Navigation** | <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Any form input or control |

---

## 🚀 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **UI Framework** | [React 19](https://react.dev/) | Latest React version utilizing modern hooks and JSX runtime |
| **Bundler & Dev Server**| [Vite 8](https://vitejs.dev/) | Next-generation frontend tooling with instant HMR (<300ms builds) |
| **Package Manager** | [pnpm 12](https://pnpm.io/) | Fast, disk space efficient package management |
| **Icons** | [@heroicons/react 2](https://heroicons.com/) | Beautiful hand-crafted SVG icons by Tailwind Labs |
| **Styling** | Pure Modern CSS | CSS custom properties (design tokens), Grid, Flexbox, and Media Queries |
| **Code Quality** | ESLint 8 | Strict linting rules with React Refresh & Hooks plugins |

---

## 🏛️ Architecture & State Management

The application follows a predictable, decoupled React state architecture powered by React's `Context` and `useReducer` APIs:

```
[ App Shell (App.jsx) ]
   ├── [ NoteProvider (noteContext.jsx) ]  <--- State Sync & LocalStorage
   │      ├── State: notes array (id, title, description, category, completed, createdAt)
   │      └── Dispatch Actions:
   │             • "add"             -> prepends new note
   │             • "delete"          -> filters by note id
   │             • "complete"        -> toggles completion flag
   │             • "edit"            -> updates note fields & adds updatedAt
   │             • "clearCompleted"  -> removes completed notes
   │
   ├── [ NoteHeader ]     ---> Search, sort selector, theme toggle & mobile trigger
   ├── [ AddNewNote ]     ---> Form validation, multi-line textarea & category select
   ├── [ NoteStatus ]     ---> Filter tabs (All/Active/Completed) & progress bar
   └── [ NoteList ]       ---> Filter & sort pipeline
          └── [ NoteItem ] ---> Individual note card with inline editing & actions
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **pnpm**: v9.0.0 or higher (`npm install -g pnpm`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Josheqani/note-app.git
   cd note-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Running Locally

Start the Vite local development server with Hot Module Replacement (HMR):

```bash
pnpm dev
```

Open your browser and navigate to `http://localhost:5173/` (or the port specified in terminal output).

---

## 📜 Available Scripts

| Command | Purpose |
| :--- | :--- |
| `pnpm dev` | Starts the local development server at `http://localhost:5173/` |
| `pnpm build` | Compiles optimized, minified production assets into `/dist` |
| `pnpm preview` | Serves the production build locally for verification |
| `pnpm lint` | Runs ESLint across all `.js` and `.jsx` source files |

---

## 📂 Project Structure

```text
note-app/
├── public/                     # Static public assets
│   └── vite.svg                # Application icon
├── src/
│   ├── components/             # Modular UI components
│   │   ├── AddNewNote.jsx      # Note creation form with validation & shortcuts
│   │   ├── Message.jsx         # Status banner component
│   │   ├── NoteHeader.jsx      # Top header with search, sort & dark mode toggle
│   │   ├── NoteItem.jsx        # Note card with inline edit, delete & completion
│   │   ├── NoteList.jsx        # Filtered & sorted notes list with empty states
│   │   └── NoteStatus.jsx      # Interactive status filter tabs & progress bar
│   ├── context/
│   │   └── noteContext.jsx     # Context provider with localStorage sync & reducer
│   ├── App.css                 # Responsive application styles & layout rules
│   ├── App.jsx                 # Main application state & shell
│   ├── index.css               # Design tokens, themes (light/dark), and resets
│   └── main.jsx                # Application entry point
├── index.html                  # HTML template with metadata & viewport
├── package.json                # Project dependencies, scripts, and metadata
├── pnpm-lock.yaml              # Deterministic pnpm dependency lockfile
└── vite.config.js              # Vite build configuration
```

---

## 🎨 Theming & Customization

All colors, shadows, and spacing are controlled via CSS custom properties located in [`src/index.css`](src/index.css). You can easily customize the theme by overriding:

```css
:root {
  --primary-600: #4f46e5;       /* Accent color */
  --bg-primary: #f8fafc;        /* Main background */
  --bg-surface: #ffffff;        /* Card surface */
  --text-primary: #0f172a;      /* Primary text */
  --border-color: #e2e8f0;      /* Borders */
}

.dark {
  --bg-primary: #0a0e17;        /* Dark background */
  --bg-surface: #111827;        /* Dark surface */
  --text-primary: #f8fafc;      /* Dark mode text */
}
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  Crafted with ❤️ by <a href="https://github.com/Josheqani">Ali Josheqani</a>
</div>
