import React, { useState } from "react";
import {
  FaLeaf,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";
import "./TaskForm.css";
import axios from "axios";
import { useEffect } from "react";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/tasks")
      .then((res) => {
        console.log("Backend Connected ✅");
        console.log(res.data.tasks);
      })
      .catch((err) => {
        console.error("Connection Failed ❌");
        console.error(err);
      });
  }, []);
  const addTask = async () => {
    if (!task.trim()) return;

    try {
      const res = await axios.post("http://localhost:8080/tasks", {
        task,
        deadline,
      });

      console.log("Saved to DB ✅", res.data);

      // update UI with DB response
      setTasks([...tasks, res.data.task]);

      setTask("");
      setDeadline("");
    } catch (err) {
      console.error("Error saving task ❌", err);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const editTask = (id) => {
    const selected = tasks.find((item) => item.id === id);

    setTask(selected.text);
    setDeadline(selected.deadline);

    setTasks(tasks.filter((item) => item.id !== id));
  };
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
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
            <FaPlus /> Add Task
          </button>
        </div>

        <div className="ai-box">
          ✨ AI Analysis will appear here once task priority is added.
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
                  {item.deadline && <span>📅 {item.deadline}</span>}
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="complete-btn"
                  onClick={() => toggleComplete(item.id)}
                >
                  <FaCheck />
                </button>

                <button onClick={() => editTask(item.id)}>
                  <FaEdit />
                </button>

                <button onClick={() => deleteTask(item.id)}>
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
