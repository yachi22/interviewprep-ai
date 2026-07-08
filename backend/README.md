# Backend — InterviewPrep AI

Express.js API server with a MySQL connection pool, structured following
clean architecture (routes → controllers → models, with config and
middleware kept separate).

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                        # MySQL connection pool + startup connection check
│   ├── controllers/
│   │   └── auth.controller.js           # POST /api/auth/register handler
│   ├── middleware/
│   │   └── validateRegister.middleware.js  # Input validation for registration
│   ├── models/
│   │   └── user.model.js                # SQL queries against the `users` table
│   ├── routes/
│   │   ├── health.routes.js             # GET /api/health — confirms the API is running
│   │   └── auth.routes.js               # /api/auth/* routes
│   ├── utils/                            # Shared helper functions (empty — placeholder)
│   ├── app.js                            # Express app: middleware + route mounting
│   └── server.js                         # Entry point: starts the HTTP listener
├── .env.example                          # Template for required environment variables
└── package.json
```

## Commands

```bash
npm install                 # install dependencies
cp .env.example .env        # then edit .env with your MySQL credentials
npm run dev                  # start with nodemon (auto-restarts on change)
npm start                    # start normally
```

## Endpoints

| Method | Path                  | Description                                      |
|--------|------------------------|---------------------------------------------------|
| GET    | `/api/health`          | Returns `{ status: "ok" }` if the API is running   |
| POST   | `/api/auth/register`  | Creates a new user account (see below)             |

### POST /api/auth/register

Request body:
```json
{
  "name": "Asha Rao",
  "email": "asha@example.com",
  "password": "supersecret1",
  "college": "IIT Delhi",
  "target_company": "Google"
}
```
`name`, `email`, and `password` are required. `college` and `target_company` are optional.
Passwords must be at least 8 characters and are hashed with bcrypt before storage — plaintext
passwords are never written to the database or returned in responses.

| Status | When                                              |
|--------|-----------------------------------------------------|
| 201    | Account created — response includes the new user (no password) |
| 400    | Missing/invalid fields — response includes an `errors` array |
| 409    | Email already registered |
| 500    | Unexpected server/database error |

## Status

Server, MySQL pool, folder structure, and user registration are implemented.
Login, JWT issuance/verification, and all other feature routes (questions,
dsa-tracker, notes, profile) have not been implemented yet.
