// Notes.jsx
import React, { useState } from "react";
import "./notes.css";

export default function Notes() {
  const [notes] = useState([
    {
      id: 1,
      title: "Meeting with Team",
      date: "May 10, 2026",
      color: "#FFE4E1",
    },
    {
      id: 2,
      title: "Buy Groceries",
      date: "May 9, 2026",
      color: "#E6E6FA",
    },
    {
      id: 3,
      title: "Study for Exam",
      date: "May 8, 2026",
      color: "#99FFFF",
    },
    {
      id: 4,
      title: "Call Mom",
      date: "May 7, 2026",
      color: "#FFF0F5",
    },
  ]);

  const [text, setText] = useState("");
  const [open, setOpen] = useState(true);

  return (
    <div className="notes-page">
      <div className="diary-page">
        <div className="washi purple"></div>

        <div className="sticker cloud">☁</div>
        <div className="sticker star">⭐</div>
        <div className="sticker heart">♡</div>
        <div className="sticker milk">🥛</div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dear Diary..."
        />
      </div>

      <div className={`notes-panel ${open ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setOpen(!open)}>
          {open ? "❯" : "❮"}
        </button>

        <div className="panel-content">
          <h2>Your Notes</h2>

          <div className="notes-list">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-card"
                style={{ background: note.color }}
              >
                <div className="card-tape"></div>

                <h3>{note.title}</h3>
                <p>{note.date}</p>
              </div>
            ))}
          </div>
        </div>

        {!open && <div className="vertical-title">Your Notes</div>}
      </div>
    </div>
  );
}
