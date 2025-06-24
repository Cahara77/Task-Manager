// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 for the backend

// --- Middleware ---
app.use(cors()); // Allows your frontend to communicate with this backend
app.use(express.json()); // Allows server to read JSON from request bodies

// --- Database Setup ---
// This will create a new file 'tasks.db' if it doesn't exist
const db = new sqlite3.Database('./tasks.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tasks table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    createdAt TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Tasks table is ready.');
    }
});


// --- API Endpoints ---

// GET: Fetch all tasks
app.get('/api/tasks', (req, res) => {
    db.all("SELECT * FROM tasks ORDER BY createdAt DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
            return;
        }
        // sqlite stores booleans as 0 or 1, convert them back for the frontend
        const tasks = rows.map(task => ({...task, completed: !!task.completed }));
        res.json(tasks);
    });
});

// POST: Create a new task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    const createdAt = new Date().toISOString();
    const sql = 'INSERT INTO tasks (title, completed, createdAt) VALUES (?, ?, ?)';
    
    db.run(sql, [title.trim(), false, createdAt], function(err) {
        if (err) {
            res.status(500).json({ error: 'Failed to create task', details: err.message });
            return;
        }
        // Return the newly created task
        db.get("SELECT * FROM tasks WHERE id = ?", [this.lastID], (err, row) => {
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve created task', details: err.message });
                return;
            }
            res.status(201).json({...row, completed: !!row.completed});
        });
    });
});

// PATCH: Toggle a task's completion status
app.patch('/api/tasks/:id/toggle', (req, res) => {
    const taskId = parseInt(req.params.id);
    // First, get the current task to find its opposite completed state
    db.get('SELECT completed FROM tasks WHERE id = ?', [taskId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to find task', details: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const newStatus = !row.completed;
        db.run('UPDATE tasks SET completed = ? WHERE id = ?', [newStatus, taskId], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update task', details: err.message });
            }
            res.json({ id: taskId, completed: newStatus });
        });
    });
});

// DELETE: Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    db.run('DELETE FROM tasks WHERE id = ?', [taskId], function(err) {
        if (err) {
            res.status(500).json({ error: 'Failed to delete task', details: err.message });
            return;
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).end(); // 204 No Content for successful deletion
    });
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API is available at http://localhost:${PORT}/api/tasks`);
});