const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// ── Persistence: save tasks to a JSON file ──────────────
const DATA_FILE = path.join(__dirname, '..', 'tasks.json');

// Load tasks from file when server starts
function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) return { tasks: [], nextId: 1 };
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

// Save tasks to file after every change
function saveTasks() {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ tasks, nextId }, null, 2));
}

// Initialize from file
let { tasks, nextId } = loadTasks();

// ── GET /tasks — return all tasks ───────────────────────
router.get('/', (req, res) => {
  res.json(tasks);
});

// ── POST /tasks — create a new task ─────────────────────
router.post('/', (req, res) => {
  const { title } = req.body;

  // Validation: title must be present and non-empty
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(); // persist to file
  res.status(201).json(newTask);
});

// ── PATCH /tasks/:id — toggle completed OR edit title ───
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // If a new title is sent, update title; otherwise toggle completed
  if (req.body.title !== undefined) {
    if (req.body.title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    task.title = req.body.title.trim();
  } else {
    task.completed = !task.completed;
  }

  saveTasks(); // persist to file
  res.json(task);
});

// ── DELETE /tasks/:id — delete a task ───────────────────
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  saveTasks(); // persist to file
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;