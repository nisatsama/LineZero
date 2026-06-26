// Planner.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./planner.css";

const palette = ["#FFB7C5", "#89CFF0", "#90EE90", "#c9b3f0", "#FFE4E1"];

const getTheme = (month) => palette[month % palette.length];

const pad = (n) => String(n).padStart(2, "0");
const formatDate = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

export default function Planner() {
  const [tasks, setTasks] = useState([]);
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  const theme = getTheme(month);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/tasks");
      const data = await res.json();
      setTasks(data.tasks);
    }
    fetchTasks();
  }, []);

  const tasksMap = useMemo(() => {
    const map = {};

    tasks.forEach((t) => {
      const date = new Date(t.deadline);

      const dateKey = `${date.getFullYear()}-${pad(
        date.getMonth() + 1,
      )}-${pad(date.getDate())}`;

      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(t);
    });

    return map;
  }, [tasks]);

  const daysInMonth = useMemo(
    () => new Date(year, month + 1, 0).getDate(),
    [year, month],
  );

  const today = new Date();

  const goPrevMonth = () => setCurrent(new Date(year, month - 1, 1));

  const goNextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const handleMonthChange = (e) => {
    setCurrent(new Date(year, Number(e.target.value), 1));
  };

  const handleYearChange = (e) => {
    setCurrent(new Date(Number(e.target.value), month, 1));
  };

  const years = Array.from(
    { length: 15 },
    (_, i) => today.getFullYear() - 7 + i,
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="planner" style={{ "--theme": theme }}>
      <div className="top-bar">
        <button onClick={goPrevMonth}>◀</button>

        <select value={month} onChange={handleMonthChange}>
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>

        <select value={year} onChange={handleYearChange}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button onClick={goNextMonth}>▶</button>
      </div>

      <h1 className="title">
        {current.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </h1>

      <div className="calendar">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateKey = formatDate(year, month, day);
          const dayTasks = tasksMap[dateKey] || [];

          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          return (
            <div key={day} className={`day-box ${isToday ? "today" : ""}`}>
              <div className="day-top">
                <span>{day}</span>
              </div>

              <div className="tasks">
                {dayTasks.length === 0 ? (
                  <div className="empty">No tasks</div>
                ) : (
                  dayTasks.map((t) => (
                    <div key={t._id} className="task">
                      {t.task}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
