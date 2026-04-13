# TaskFlow — Personal Task Dashboard

A modern, multi-page React task management dashboard built with Vite, React Router v6, and Tailwind CSS. Fetches live data from public APIs to display tasks and daily advice.

![TaskFlow Dashboard](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss) ![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat&logo=reactrouter)

---

## 🚀 Live Demo

> Deploy via [Vercel](https://vercel.com) or [Netlify](https://netlify.com) by connecting your GitHub repository.

---

## ✨ Features

- **Home Page** — Fetches and displays random advice from the [Advice Slip API](https://api.adviceslip.com/) with a refresh button and loading skeleton
- **Tasks List Page** — Fetches 10 tasks from [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos?_limit=10) with filter tabs (All / Completed / Pending) and a progress bar
- **Task Detail Page** — Reads the task `id` from the URL using `useParams()` and fetches individual task data
- **Reusable `TaskCard` component** — Shows completion status with conditional styling
- **Custom `useFetch` hook** — Manages loading, error, and data state with cleanup
- **Loading skeletons** — Shown during all API calls
- **Responsive design** — Works on mobile, tablet, and desktop
- **404 page** — Catch-all route for unknown URLs

---

## 🗂 Project Structure

```
task-dashboard/
├── index.html                  # Entry HTML with Google Fonts
├── vite.config.js
├── tailwind.config.js          # Custom colors, fonts, animations
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React DOM root
    ├── App.jsx                 # BrowserRouter + Routes
    ├── index.css               # Tailwind + custom component classes
    ├── components/
    │   ├── Navbar.jsx          # Sticky nav bar with NavLink active states
    │   ├── TaskCard.jsx        # Reusable task card component
    │   └── SkeletonCard.jsx    # Shimmer loading placeholders
    ├── hooks/
    │   └── useFetch.js         # Custom data-fetching hook
    └── pages/
        ├── Home.jsx            # / — Advice API + hero + features
        ├── Tasks.jsx           # /tasks — Task list with filters
        ├── TaskDetail.jsx      # /tasks/:id — Single task view
        └── NotFound.jsx        # * — 404 fallback
```

---

## 🔌 APIs Used

| API | Endpoint | Used In |
|---|---|---|
| [Advice Slip API](https://api.adviceslip.com/) | `GET /advice` | Home page |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | `GET /todos?_limit=10` | Tasks list |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | `GET /todos/:id` | Task detail |

---

## 🧠 React Concepts Applied

| Concept | Where |
|---|---|
| `useState` | Loading, error, filter, advice state |
| `useEffect` | API calls triggered on mount / URL change |
| `useParams` | Reading `:id` in `TaskDetail.jsx` |
| Custom Hook | `useFetch.js` — reusable fetch logic |
| Component Composition | `TaskCard`, `SkeletonCard`, `Navbar` |
| Conditional Rendering | Loading skeletons, error states, status badges |
| React Router v6 | `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link` |

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/task-dashboard.git
cd task-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌿 Git Workflow

This project was developed using a feature branch workflow:

```bash
# Development was done on:
git checkout -b feature/task-dashboard

# Commits followed conventional format:
git commit -m "feat: set up Vite + React with Tailwind CSS"
git commit -m "feat: add React Router with Home, Tasks, and TaskDetail routes"
git commit -m "feat: integrate Advice Slip API on Home page with loading state"
git commit -m "feat: implement Tasks list page with JSONPlaceholder API"
git commit -m "feat: add TaskDetail page with useParams and dynamic fetching"
git commit -m "feat: create reusable TaskCard and SkeletonCard components"
git commit -m "feat: add useFetch custom hook with cleanup and error handling"
git commit -m "style: apply Tailwind responsive design across all pages"
git commit -m "docs: add README with setup instructions"

# PR opened from feature/task-dashboard → main
```

---

## 📱 Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Advice API + hero + navigation |
| `/tasks` | Tasks | Fetched task list with filters |
| `/tasks/:id` | Task Detail | Single task fetched by URL param |
| `*` | 404 | Catch-all not-found page |

---

## 🎨 Design System

- **Fonts**: Syne (display), DM Sans (body), JetBrains Mono (code)
- **Theme**: Dark navy background with cyan/lime/amber accents
- **Components**: Glass morphism cards with subtle borders and backdrop blur
- **Animations**: Fade-in, slide-up, shimmer skeleton loading

---

## 📄 License

MIT — feel free to use this project as a portfolio reference.
