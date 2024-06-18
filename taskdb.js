const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create and connect to a SQLite database
const db = new sqlite3.Database('tasks.db');

// Create a table to store tasks
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, status TEXT)');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Task Creation
app.post('/tasks', (req, res) => {
  const { title, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required.' });
  }

  const stmt = db.prepare('INSERT INTO tasks (title, status) VALUES (?, ?)');
  stmt.run(title, status, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create a task.' });
    }
    res.json({ message: 'Task created successfully', taskId: this.lastID });
  });
  stmt.finalize();
});

// Task Viewing (all tasks)
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
    res.json({ tasks: rows });
  });
});

// Task Viewing (specific task by ID)
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch the task.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json({ task: row });
  });
});

// Task Updating
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, status } = req.body;
  if (!title && !status) {
    return res.status(400).json({ error: 'Title or status must be provided for update.' });
  }

  const stmt = db.prepare('UPDATE tasks SET title = COALESCE(?, title), status = COALESCE(?, status) WHERE id = ?');
  stmt.run(title, status, taskId, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update the task.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json({ message: 'Task updated successfully' });
  });
  stmt.finalize();
});

// Task Deletion
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete the task.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Task Management System app is running on port ${port}`);
});
