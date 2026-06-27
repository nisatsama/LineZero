import React, { useState, useEffect } from "react";
import {
  FaLeaf,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";
import "./TaskForm.css";
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const TaskForm = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch tasks
  useEffect(() => {
    axios
      .get("http://localhost:8080/tasks", config)
      .then((res) => {
        console.log("Backend Connected ✅");
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.error("Connection Failed ❌", err);
      });
  }, []);

  // Add or Update Task
  const addTask = async () => {
    if (!task.trim()) return;

    try {
      if (editingId) {
        // Update existing task
        const res = await axios.put(
          `http://localhost:8080/tasks/${editingId}`,
          {
            task,
            deadline,
          },
          config,
        );

        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item._id === editingId ? res.data.task : item,
          ),
        );

        setEditingId(null);
      } else {
        // Create new task
        const res = await axios.post(
          "http://localhost:8080/tasks",
          {
            task,
            deadline,
          },
          config,
        );

        setTasks((prevTasks) => [...prevTasks, res.data.task]);
      }

      setTask("");
      setDeadline("");
    } catch (err) {
      console.error("Error saving task ❌", err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`, config);

      setTasks((prevTasks) => prevTasks.filter((item) => item._id !== id));

      console.log("Task deleted successfully ✅");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit Task
  const editTask = (id) => {
    const selected = tasks.find((item) => item._id === id);

    if (!selected) return;

    setTask(selected.task);
    setDeadline(
      selected.deadline
        ? new Date(selected.deadline).toISOString().slice(0, 16)
        : "",
    );

    setEditingId(id);
  };

  // Toggle Complete
  const toggleComplete = async (id) => {
    try {
      const selected = tasks.find((item) => item._id === id);

      if (!selected) return;

      const res = await axios.put(
        `http://localhost:8080/tasks/${id}`,
        {
          task: selected.task,
          deadline: selected.deadline,
          completed: !selected.completed,
        },
        config,
      );

      setTasks((prevTasks) =>
        prevTasks.map((item) => (item._id === id ? res.data.task : item)),
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="task-container">
      <div className="task-card">
        <h2>🌸 Smart Task Planner</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Add a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <div className="date-input">
            <FaCalendarAlt />
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={addTask}>
            <FaPlus />
            {editingId ? " Update Task" : " Add Task"}
          </button>
        </div>

        <div className="ai-box">
          ✨ AI Analytics will appear here once task priority is added.
        </div>

        <div className="task-list">
          {tasks.map((item) => (
            <div
              className={`task-item ${item.completed ? "completed" : ""}`}
              key={item._id}
            >
              <div className="task-content">
                <FaLeaf className="leaf-icon" />

                <div>
                  <p>{item.task}</p>

                  {item.deadline && (
                    <span>📅 {new Date(item.deadline).toLocaleString()}</span>
                  )}
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="complete-btn"
                  onClick={() => toggleComplete(item._id)}
                  title="Mark Complete"
                >
                  <FaCheck />
                </button>

                <button onClick={() => editTask(item._id)} title="Edit Task">
                  <FaEdit />
                </button>

                <button
                  onClick={() => deleteTask(item._id)}
                  title="Delete Task"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
