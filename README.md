# Task Manager App

A simple full-stack Task Manager application built with vanilla JavaScript on the frontend and Node.js + Express on the backend.

---

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Backend  | Node.js, Express.js |
| Storage  | File-based (tasks.json) |

---

## Features

- View all tasks in a clean, responsive UI
- Add new tasks with validation
- Mark tasks as completed / incomplete
- Edit existing task titles inline
- Delete tasks
- Filter tasks by All / Pending / Completed
- Tasks persist after page refresh
- Loading and error states handled throughout
- Stats bar showing total, pending, and completed counts

---

## Project Structure

    task-manager/
    ├── backend/
    │   ├── routes/
    │   │   └── tasks.js      # All API route handlers
    │   ├── server.js         # Express app entry point
    │   ├── tasks.json        # Auto-generated persistent storage
    │   └── package.json
    ├── frontend/
    │   └── index.html        # Complete frontend (HTML + CSS + JS)
    └── README.md

---

## Setup & Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Start the backend server
```bash
node server.js
```
You should see:
Server running at http://localhost:3000

### 4. Open the frontend
Open `frontend/index.html` directly in your browser (double-click the file).

That's it! The app is ready to use.

---

## API Endpoints

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| GET    | /tasks        | Fetch all tasks          |
| POST   | /tasks        | Create a new task        |
| PATCH  | /tasks/:id    | Toggle complete or edit title |
| DELETE | /tasks/:id    | Delete a task            |

### Example Request — Create a Task
```json
POST /tasks
Content-Type: application/json

{
  "title": "Buy groceries"
}
```

### Example Response
```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2025-01-10T10:30:00.000Z"
}
```

---

## Assumptions & Trade-offs

- **No database used** — the assignment explicitly allows in-memory or file-based storage. I chose file-based (`tasks.json`) so tasks persist across server restarts, which feels more realistic.
- **Single HTML file for frontend** — kept intentionally simple as the assignment prioritises functionality over complexity. No build tools or frameworks needed.
- **Toggle vs explicit status** — the PATCH endpoint toggles `completed` when no title is sent, and updates the title when one is provided. This keeps the API minimal while supporting both operations.
- **No authentication** — out of scope for this exercise as it was not mentioned in requirements.
- **CORS enabled** — allows the frontend file to communicate with the backend when opened directly in a browser.

---

## If I Had More Time

- Add a proper database (SQLite or PostgreSQL)
- Write unit tests for API endpoints
- Add due dates and priority levels
- Deploy frontend and backend separately
- Add user authentication

---

Built with ❤️ as part of a technical assignment.