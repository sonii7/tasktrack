const express = require('express');
const app = express();
const PORT = 3008;
const cors = require('cors');

// Sample database of tasks
let tasks = [];
app.use(express.json());
app.use(cors());

// Get all tasks
app.get('/tasks', (req, res) => {
  res.send(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: Date.now().toString(), title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an existing task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], title, description };
  res.json(tasks[taskIndex]);
});

// Delete an existing task
app.delete('/tasks/:id', (req, res) =>  {
  const taskId = req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
