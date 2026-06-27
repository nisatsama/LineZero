const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markCompleted,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getAllTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/complete", protect, markCompleted);

module.exports = router;
