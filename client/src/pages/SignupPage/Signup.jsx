import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(formData);

    // TODO:
    // Connect Signup API
  };

  return (
    <div className="signup-page">
      <div className="floating-circle circle1"></div>
      <div className="floating-circle circle2"></div>
      <div className="floating-circle circle3"></div>

      <div className="signup-card">
        <h1>🌸 ZeroLine</h1>
        <h2>Create Account</h2>
        <p>Start your productivity journey today.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Choose a username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <div className="password-box">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button className="signup-btn">Create Account</button>
        </form>

        <div className="bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
