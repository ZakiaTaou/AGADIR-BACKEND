// controllers/taskController.js

import Task  from '../models/Task.js';
// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const user_id = req.user.id; // From auth middleware

    // Validation
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Le titre de la tâche est obligatoire' 
      });
    }

    const task = await Task.create({
      user_id,
      title,
      description: description || null,
      due_date: due_date || null,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Tâche créée avec succès',
      data: task
    });
  } catch (error) {
    console.error('Erreur création tâche:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la tâche',
      error: error.message
    });
  }
};

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { status } = req.query; // Filter by status

    const whereClause = { user_id };

    if (status && (status === 'pending' || status === 'done')) {
      whereClause.status = status;
    }

    const tasks = await Task.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Erreur récupération tâches:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des tâches',
      error: error.message
    });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const task = await Task.findOne({
      where: { 
        id, 
        user_id 
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Erreur récupération tâche:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la tâche',
      error: error.message
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { title, description, status, due_date } = req.body;

    // Check if task exists and belongs to user
    const task = await Task.findOne({
      where: { 
        id, 
        user_id 
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }

    // Prepare update data
    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined && (status === 'pending' || status === 'done')) {
      updateData.status = status;
    }
    if (due_date !== undefined) updateData.due_date = due_date;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune donnée à mettre à jour'
      });
    }

    // Update task
    await task.update(updateData);

    res.status(200).json({
      success: true,
      message: 'Tâche mise à jour avec succès',
      data: task
    });
  } catch (error) {
    console.error('Erreur mise à jour tâche:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la tâche',
      error: error.message
    });
  }
};

// @desc    Mark task as done
// @route   PATCH /api/tasks/:id/done
// @access  Private
export const markTaskDone = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // Check if task exists and belongs to user
    const task = await Task.findOne({
      where: { 
        id, 
        user_id 
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }

    // Update status to done
    await task.update({ status: 'done' });

    res.status(200).json({
      success: true,
      message: 'Tâche marquée comme terminée',
      data: task
    });
  } catch (error) {
    console.error('Erreur marquage tâche:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du marquage de la tâche',
      error: error.message
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // Check if task exists and belongs to user
    const task = await Task.findOne({
      where: { 
        id, 
        user_id 
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }

    await task.destroy();

    res.status(200).json({
      success: true,
      message: 'Tâche supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression tâche:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la tâche',
      error: error.message
    });
  }
};

