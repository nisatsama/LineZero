import React from "react";
import "./Analytics.css";

const Analytics = () => {
  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>AI-powered insights based on your real productivity data.</p>
      </div>

      {/* Progress Cards */}
      <div className="progress-section">
        <div className="progress-card">
          <div className="progress-header">
            <h2>Weekly Completion</h2>
            <span>82%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "82%" }}></div>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-header">
            <h2>Monthly Completion</h2>
            <span>79%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "79%" }}></div>
          </div>
        </div>
      </div>

      {/* Weekly Stats */}
      <h2 className="section-title">Weekly Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Completed</h3>
          <p>21</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>5</p>
        </div>

        <div className="stat-card">
          <h3>High Priority</h3>
          <p>9</p>
        </div>

        <div className="stat-card">
          <h3>Avg / Day</h3>
          <p>4</p>
        </div>
      </div>

      {/* Monthly Stats */}
      <h2 className="section-title">Monthly Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Completed</h3>
          <p>88</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>19</p>
        </div>

        <div className="stat-card">
          <h3>High Priority</h3>
          <p>31</p>
        </div>

        <div className="stat-card">
          <h3>Avg / Day</h3>
          <p>3.8</p>
        </div>
      </div>

      {/* AI Report */}

      <div className="report-card">
        <h2>AI Productivity Report</h2>

        <p>
          Your completion rate improved this week. Most unfinished tasks are
          high priority. Consider scheduling those tasks earlier in the day to
          improve consistency.
        </p>

        <button className="generate-btn">Generate AI Report</button>
      </div>
    </div>
  );
};

export default Analytics;
