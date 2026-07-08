# Frontend — InterviewPrep AI

React + Vite client, styled with Tailwind CSS.

## Folder Structure

```
frontend/
├── public/            # Static files served as-is (favicon, robots.txt, etc.)
├── src/
│   ├── assets/         # Images, icons, fonts imported into components
│   ├── components/     # Reusable, page-agnostic UI pieces (Navbar, Sidebar, Layout)
│   ├── pages/           # One component per route/screen (Home, Login, Dashboard, ...)
│   ├── routes/          # Centralized React Router route definitions (AppRoutes.jsx)
│   ├── App.jsx          # Root component — renders AppRoutes
│   ├── main.jsx         # Entry point — mounts React app, sets up BrowserRouter
│   └── index.css        # Global stylesheet (Tailwind directives only)
├── index.html          # HTML shell Vite injects the app into
├── vite.config.js      # Vite build/dev-server config (incl. API proxy)
├── tailwind.config.js  # Tailwind content paths & theme
└── postcss.config.js   # PostCSS pipeline (Tailwind + autoprefixer)
```

## Commands

```bash
npm install     # install dependencies
npm run dev     # start dev server (http://localhost:5173)
npm run build   # production build -> dist/
npm run preview # preview the production build locally
```

## Status

Routing, layout, and placeholder pages only. No authentication or data
fetching has been wired up yet.
