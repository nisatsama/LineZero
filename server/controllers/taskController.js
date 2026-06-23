// controllers/taskController.js

const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    console.log("Received:", req.body);

    const { task, deadline } = req.body;

    const newTask = await Task.create({
      task,
      deadline,
    });

    console.log("Saved:", newTask);

    res.status(201).json({
      success: true,
      task: newTask,
    });
  } catch (error) {
    console.error("Create Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// const createTask = async (req, res) => {
//   try {
//     const { task, deadline } = req.body;

//     const newTask = await Task.create({
//       task,
//       deadline,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Task created successfully",
//       task: newTask,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Complete
const markCompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completed = true;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task marked as completed",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markCompleted,
};
