import React from "react";
import "./profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">🌸</div>

          <div className="user-info">
            <h1>Nisat Sama</h1>
            <p>Future Software Engineer 💻</p>
            <span>Joined June 2026</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>🔥</h2>
            <h3>12</h3>
            <p>Day Streak</p>
          </div>

          <div className="stat-card">
            <h2>⭐</h2>
            <h3>250</h3>
            <p>XP</p>
          </div>

          <div className="stat-card">
            <h2>🏅</h2>
            <h3>3</h3>
            <p>Level</p>
          </div>

          <div className="stat-card">
            <h2>✅</h2>
            <h3>48</h3>
            <p>Tasks</p>
          </div>
        </div>

        <div className="activity-section">
          <h2>Productivity Overview</h2>

          <div className="activity-item">
            <span>📝 Notes Created</span>
            <span>18</span>
          </div>

          <div className="activity-item">
            <span>📖 Diary Entries</span>
            <span>9</span>
          </div>

          <div className="activity-item">
            <span>📅 Planner Events</span>
            <span>22</span>
          </div>

          <div className="activity-item">
            <span>⏳ Pomodoro Sessions</span>
            <span>64</span>
          </div>
        </div>

        <div className="achievement-section">
          <h2>Achievements 🏆</h2>

          <div className="badges">
            <div className="badge">
              🌱
              <br />
              Beginner
            </div>

            <div className="badge">
              🔥
              <br />
              7-Day Streak
            </div>

            <div className="badge">
              📚
              <br />
              Note Master
            </div>

            <div className="badge">
              ⏰<br />
              Focus Hero
            </div>
          </div>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
