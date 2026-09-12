# InterviewPrep AI

A full-stack interview preparation platform designed to help students organize company-specific interview questions, track DSA preparation, save important questions, maintain personal notes, manage resumes, and monitor their preparation progress.

## 🚀 Features

* 🔐 **JWT Authentication**

  * User signup and login
  * Protected routes
  * Cookie-based authentication

* 💼 **Company-wise Interview Questions**

  * Practice company-specific questions
  * Search by company
  * Filter by difficulty
  * Filter by topic
  * View answers and question details

* 🔖 **Bookmarks**

  * Save important interview questions
  * Access bookmarked questions for revision

* ✅ **Solved Questions**

  * Track completed interview questions
  * Monitor preparation progress

* 📚 **DSA Tracker**

  * Track DSA preparation
  * Maintain problem-solving progress

* 📝 **Personal Notes**

  * Create and manage interview preparation notes
  * Keep important concepts and reminders in one place

* 📄 **Resume Management**

  * Upload and manage resume
  * Store resume information securely

* 📊 **Dashboard**

  * View preparation statistics
  * Track solved questions, bookmarks and notes
  * Monitor resume status
  * Quick navigation to important preparation modules

* 👤 **User Profile**

  * View and manage user profile information

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MySQL
* JWT
* Cookie-based authentication
* Multer
* REST APIs

### Database

* MySQL
* Relational database design
* User-specific persistent data

## 🏗️ Project Architecture

The application follows a client-server architecture:

```text
                 ┌─────────────────────┐
                 │      React UI       │
                 │  React + Tailwind   │
                 └──────────┬──────────┘
                            │
                         Axios
                            │
                            ▼
                 ┌─────────────────────┐
                 │    Express API      │
                 │      Node.js        │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Controllers     Models       Middleware
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │       MySQL         │
                 │      Database       │
                 └─────────────────────┘
```

## 📁 Project Structure

```text
interviewprep-ai/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   │
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── routes/
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MySQL
* Git

### 1. Clone the repository

```bash
git clone https://github.com/yachi22/interviewprep-ai.git
cd interviewprep-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=interviewprep

JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## 🔑 Authentication Flow

The application uses JWT-based authentication with HTTP cookies.

```text
User
  │
  ▼
Login / Signup
  │
  ▼
Express Authentication API
  │
  ▼
JWT Token
  │
  ▼
HTTP Cookie
  │
  ▼
Protected API Requests
  │
  ▼
Authenticated User Data
```

Protected routes verify the authenticated user before allowing access to private resources.

## 🔎 Question Search & Filtering

Interview questions can be filtered using:

* Company
* Difficulty
* Topic

Example:

```text
Company: Google
Difficulty: Medium
Topic: Arrays
```

The frontend sends filter parameters to the Express API, which builds the corresponding MySQL query and returns the matching questions.

## 📊 Dashboard

The dashboard provides a centralized overview of the user's preparation activity, including:

* Number of companies
* Solved questions
* Bookmarked questions
* Personal notes
* Resume status
* Preparation progress

## 📄 Resume Management

Users can upload their resume through the application.

The backend uses **Multer** for handling multipart file uploads and stores the resume information associated with the authenticated user.

## 🗄️ Database

MySQL is used as the primary database for persistent application data.

The database stores information related to:

* Users
* Companies
* Interview questions
* Bookmarks
* Solved questions
* DSA progress
* Notes
* Resumes

User-specific data is associated with the authenticated user's ID.

## 🔒 Security

The application includes:

* JWT authentication
* Protected API routes
* HTTP-only authentication cookies
* Environment variables for sensitive configuration
* CORS configuration
* Server-side authentication middleware

Sensitive environment files and uploaded files are excluded from version control using `.gitignore`.

## 🧪 Development

Run the backend and frontend separately during development.

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## 📸 Screenshots

Screenshots of the application will be added here.

Suggested screenshots:

1. Dashboard
2. Company Questions
3. Search & Filtering
4. DSA Tracker
5. Notes
6. Resume
7. Profile

## 🚀 Future Improvements

Potential future improvements include:

* AI-powered resume analysis
* More company-specific interview questions
* Advanced DSA analytics
* Interview preparation recommendations
* Deployment with production infrastructure
* Additional authentication and account-management features

## 👩‍💻 Author

**Yachi Dosi**

GitHub: [@yachi22](https://github.com/yachi22)
