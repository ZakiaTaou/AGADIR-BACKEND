// routes/taskRoutes.js
import express from 'express';
const router = express.Router();
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  markTaskDone,
  deleteTask
} from '../controllers/taskController.js';
import {authenticateToken} from '../middlewares/authMiddleware.js'

// Apply auth middleware to all task routes
router.use(authenticateToken);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', createTask);

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user (with optional status filter)
// @access  Private
router.get('/', getTasks);

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get('/:id', getTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', updateTask);

// @route   PATCH /api/tasks/:id/done
// @desc    Mark task as done
// @access  Private
router.patch('/:id/done', markTaskDone);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', deleteTask);

export default router;