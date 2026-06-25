import React, { useEffect, useMemo, useState } from "react";
import "./today.css";

const getTimeTheme = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
};

const Today = ({ userName = "Nisat" }) => {
  const theme = useMemo(() => getTimeTheme(), []);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/tasks?deadline=${today}`,
        );

        const data = await res.json();

        // 🔥 FIX: ensure tasks is always an array
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data?.tasks)) {
          setTasks(data.tasks);
        } else if (Array.isArray(data?.data)) {
          setTasks(data.data);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayTasks();
  }, [today]);

  // 🔥 SAFE ARRAY GUARD
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  // Filter tasks
  const todayTasks = safeTasks.filter(
    (t) => t.deadline?.split("T")[0] === today,
  );

  const urgentTasks = safeTasks.filter(
    (t) => t.deadline?.split("T")[0] === today && t.priority === "urgent",
  );

  return (
    <div className={`today-page ${theme}`}>
      <div className="today-grid">
        {/* LEFT: TODAY TASKS */}
        <div className="today-left">
          <div className="card big-card">
            <h2>📅 Today’s Tasks</h2>

            {loading ? (
              <p className="muted">Loading tasks...</p>
            ) : todayTasks.length === 0 ? (
              <p className="muted">No tasks scheduled for today 🎉</p>
            ) : (
              <div className="task-list-mini">
                {todayTasks.map((tasks) => (
                  <div key={tasks.id || tasks._id} className="mini-task">
                    <p>{tasks.task}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="today-right">
          {/* URGENT TASKS */}
          <div className="card small-card urgent">
            <h3>🚨 Urgent Today</h3>

            {loading ? (
              <p className="muted">Loading...</p>
            ) : urgentTasks.length === 0 ? (
              <p className="muted">All chill for today 😌</p>
            ) : (
              urgentTasks.map((t) => (
                <div key={t.id || t._id} className="urgent-item">
                  {t.task}
                </div>
              ))
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="card medium-card">
            <h3>📝 Quick Actions</h3>
            <div className="quick-actions">
              <button>Add Note</button>
              <button>Add Project</button>
            </div>
          </div>

          {/* AI BOX */}
          <div className="card ai-card">
            <h3>🤖 AI Coach</h3>
            <p className="greet">Good morning, {userName} 👋</p>
            <p className="thought">
              “Small steps every day lead to massive change.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
