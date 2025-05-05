const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validate');

router.post('/:projectId/tasks', auth, validateTask, createTask);
router.get('/:projectId/tasks', auth, getTasks);
router.put('/:taskId', auth, updateTask);  // Optional: add validation here too
router.delete('/:taskId', auth, deleteTask);

module.exports = router;
