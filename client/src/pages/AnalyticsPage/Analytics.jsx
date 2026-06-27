import React, { useEffect, useState } from "react";
import "./Analytics.css";
import axios from "axios";

import {
  FaChartLine,
  FaCheckCircle,
  FaTasks,
  FaFire,
  FaCalendarAlt,
  FaRobot,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#90EE90", "#FFB7C5"];

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  const [statistics, setStatistics] = useState(null);

  const [aiReport, setAiReport] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/analytics/report", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStatistics(res.data.statistics);

      setAiReport(res.data.aiReport);

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-loading">Analysing your productivity...</div>
    );
  }

  return (
    <div className="analytics-page">
      {/* Header */}

      <div className="analytics-header">
        <h1>
          <FaChartLine />
          Productivity Analytics
        </h1>

        <p>Your AI-powered weekly and monthly report.</p>
      </div>

      {/* Statistics */}

      <div className="stats-grid">
        <div className="stat-card pink">
          <FaTasks />

          <h2>{statistics.totalTasks}</h2>

          <p>Total Tasks</p>
        </div>

        <div className="stat-card green">
          <FaCheckCircle />

          <h2>{statistics.completedTasks}</h2>

          <p>Completed</p>
        </div>

        <div className="stat-card blue">
          <FaFire />

          <h2>{statistics.productivityScore}</h2>

          <p>Productivity Score</p>
        </div>

        <div className="stat-card cyan">
          <FaCalendarAlt />

          <h2>{statistics.completionRate}%</h2>

          <p>Completion Rate</p>
        </div>
      </div>

      {/* Graph Section */}

      <div className="graph-section">
        {/* Weekly Trend */}

        <div className="graph-card">
          <h2>Weekly Progress</h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={statistics.charts.last7Days}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="completed"
                stroke="#90EE90"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Pie */}

        <div className="graph-card">
          <h2>Task Completion</h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statistics.charts.completionChart}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {statistics.charts.completionChart.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* ================================
            Weekly & Monthly Summary
      ================================= */}

      <div className="summary-grid">
        <div className="summary-card">
          <h2>📅 Weekly Report</h2>

          <div className="summary-row">
            <span>Total Tasks</span>
            <strong>{statistics.weekly.total}</strong>
          </div>

          <div className="summary-row">
            <span>Completed</span>
            <strong>{statistics.weekly.completed}</strong>
          </div>

          <div className="summary-row">
            <span>Completion</span>
            <strong>{statistics.weekly.completionRate}%</strong>
          </div>
        </div>

        <div className="summary-card">
          <h2>🗓 Monthly Report</h2>

          <div className="summary-row">
            <span>Total Tasks</span>
            <strong>{statistics.monthly.total}</strong>
          </div>

          <div className="summary-row">
            <span>Completed</span>
            <strong>{statistics.monthly.completed}</strong>
          </div>

          <div className="summary-row">
            <span>Completion</span>
            <strong>{statistics.monthly.completionRate}%</strong>
          </div>
        </div>
      </div>

      {/* ================================
                Monthly Trend
      ================================= */}

      <div className="graph-card monthly-chart">
        <h2>📈 Monthly Completion Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={statistics.charts.monthlyProgress}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#87D3F8"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================================
                Streak + Deadlines
      ================================= */}

      <div className="bottom-grid">
        <div className="streak-card">
          <FaFire className="fire-icon" />

          <h2>{statistics.productivityScore}%</h2>

          <p>Current Productivity</p>
        </div>

        <div className="deadline-card">
          <h2>⏰ Upcoming Deadlines</h2>

          {statistics.upcomingTasks.length === 0 ? (
            <p className="empty">No upcoming deadlines 🎉</p>
          ) : (
            statistics.upcomingTasks.map((task, index) => (
              <div key={index} className="deadline-item">
                <span>{task.task}</span>

                <small>{new Date(task.deadline).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================================
                  AI REPORT
      ================================= */}

      <div className="ai-section">
        <div className="ai-header">
          <FaRobot />

          <h2>AI Productivity Report</h2>
        </div>

        <div className="ai-card">
          <h3>Weekly Summary</h3>

          <p>{aiReport.weeklySummary}</p>
        </div>

        <div className="ai-card">
          <h3>Monthly Summary</h3>

          <p>{aiReport.monthlySummary}</p>
        </div>
      </div>

      {/* ================================
             Strengths & Improvements
      ================================= */}

      <div className="insight-grid">
        <div className="insight-card green-card">
          <h2>✅ Strengths</h2>

          <ul>
            {aiReport.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="insight-card pink-card">
          <h2>📌 Improvements</h2>

          <ul>
            {aiReport.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================================
                Suggestions
      ================================= */}

      <div className="suggestion-card">
        <h2>💡 Suggestions</h2>

        <ul>
          {aiReport.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ================================
                Motivation
      ================================= */}

      <div className="motivation-card">
        <h2>🌸 AI Motivation</h2>

        <p>{aiReport.motivation}</p>
      </div>
    </div>
  );
};

export default Analytics;
