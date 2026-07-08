# InterviewPrep AI

A platform to help students prepare for software engineering placements —
company-wise interview questions, a DSA practice tracker, personal notes,
and a dashboard to track overall progress.

This repository currently contains only the **project foundation**:
folder structure, tooling configuration, routing, placeholder pages, and
reusable layout components. No authentication or business logic has been
implemented yet — that will be built on top of this foundation.

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Auth (planned, not yet implemented):** JWT

## Project Structure

```
interviewprep-ai/
├── frontend/     # React + Vite client (UI)
└── backend/      # Express API server + MySQL connection
```

See the `README.md` inside each of `frontend/` and `backend/` for
directory-level details, and inline comments in each file for the
purpose of that specific file/folder.

## Getting Started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in your MySQL credentials
npm run dev
```

The API server starts on `http://localhost:5000` by default.
It exposes a single `GET /api/health` route for now, and attempts a
MySQL connection pool test on startup (this will only succeed once you've
provided valid credentials in `.env` and created the database).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server starts on `http://localhost:5173` by default and
proxies `/api` requests to the backend (see `vite.config.js`).

## Notes

- No login/signup logic, JWT handling, or database queries have been
  implemented yet. Pages are placeholders that render static content only.
- Clean architecture is followed on both sides: UI components, pages, and
  routes are separated on the frontend; config, routes, controllers,
  middleware, and models are separated on the backend, ready to be filled in.
