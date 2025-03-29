// server/routes/tasks.js
const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Use auth middleware for all routes in this router
router.use(authMiddleware);

// GET /api/tasks - Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error('Error in GET /api/tasks:', error.message);
    res.status(500).send('Server error');
  }
});

// POST /api/tasks - Create a new task for the authenticated user
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });
    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    console.error('Error in POST /api/tasks:', error.message);
    res.status(500).send('Server error');
  }
});

// PUT /api/tasks/:id - Update a task (only if it belongs to the user)
router.put('/:id', async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    // Update task fields
    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    task = await task.save();
    res.json(task);
  } catch (error) {
    console.error('Error in PUT /api/tasks/:id:', error.message);
    res.status(500).send('Server error');
  }
});

// DELETE /api/tasks/:id - Delete a task (only if it belongs to the user)
// server/routes/tasks.js

// DELETE /api/tasks/:id - Delete a task (only if it belongs to the user)
router.delete('/:id', async (req, res) => {
    try {
      let task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      // Check if the task belongs to the user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      await task.deleteOne();  // Use deleteOne() instead of remove()
      res.json({ message: 'Task removed' });
    } catch (error) {
      console.error('Error in DELETE /api/tasks/:id:', error.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
