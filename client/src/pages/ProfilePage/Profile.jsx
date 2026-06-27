import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ FIX: extract actual profile object
        setProfile(res.data.profile);
      } catch (error) {
        console.log("Profile fetch error:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <h2>Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">🌸</div>

          <div className="user-info">
            <h1>{profile.user?.name || "User"}</h1>

            <p>{profile.bio || "Future Software Engineer 💻"}</p>

            <span>
              Joined{" "}
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "Recently"}
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h2>🔥</h2>
            <h3>{profile.streak ?? 0}</h3>
            <p>Day Streak</p>
          </div>

          <div className="stat-card">
            <h2>⭐</h2>
            <h3>{profile.xp ?? 0}</h3>
            <p>XP</p>
          </div>

          <div className="stat-card">
            <h2>🏅</h2>
            <h3>{profile.level ?? 1}</h3>
            <p>Level</p>
          </div>

          <div className="stat-card">
            <h2>✅</h2>
            <h3>{profile.tasksCompleted ?? 0}</h3>
            <p>Tasks</p>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="activity-section">
          <h2>Productivity Overview</h2>

          <div className="activity-item">
            <span>📝 Notes Created</span>
            <span>{profile.notesCreated ?? 0}</span>
          </div>

          <div className="activity-item">
            <span>📖 Diary Entries</span>
            <span>{profile.diaryEntries ?? 0}</span>
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="achievement-section">
          <h2>Achievements 🏆</h2>

          <div className="badges">
            {(profile.xp ?? 0) >= 10 && (
              <div className="badge">
                🌱
                <br />
                Beginner
              </div>
            )}

            {(profile.streak ?? 0) >= 7 && (
              <div className="badge">
                🔥
                <br />
                7-Day Streak
              </div>
            )}

            {(profile.notesCreated ?? 0) >= 10 && (
              <div className="badge">
                📚
                <br />
                Note Master
              </div>
            )}

            {(profile.level ?? 1) >= 5 && (
              <div className="badge">
                ⏰<br />
                Focus Hero
              </div>
            )}
          </div>
        </div>

        {/* EDIT BUTTON */}
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
