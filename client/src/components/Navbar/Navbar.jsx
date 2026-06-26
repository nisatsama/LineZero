import React from "react";
import { Link } from "react-router-dom";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";

import "./Navbar.css";
import logo from "../../assets/zerlinelogo.png"; // your uploaded logo

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Top Row */}
      <div className="navbar-top">
        <div className="logo-section">
          <div className="logo-wrapper">
            <img src={logo} alt="ZerLine Logo" className="logo" />

            <div className="green-plant">🌱</div>
          </div>

          <span className="brand-name">ZeroLine</span>
        </div>

        <div className="search-container">
          <FiSearch className="search-icon" />

          <input type="text" placeholder="Ask your AI..." />
        </div>

        <div className="nav-actions">
          <div className="stat-pill">
            <FaFire color="orange" />
            <span>12 Day Streak</span>
          </div>

          <div className="stat-pill">
            <GiBullseye color="red" />
            <span>89 Focus</span>
          </div>

          <button className="icon-btn">
            <FiBell />
          </button>

          <Link to="/profile" className="profile-btn">
            <FiUser />
          </Link>
        </div>
      </div>

      {/* Bottom Row */}
      {/* Bottom Row */}
      <div className="navbar-bottom">
        <Link to="/">Home</Link>
        <Link to="/today">Today</Link>
        <Link to="/planner">Planner</Link>

        <Link to="/analytics">Analytics</Link>
        <Link to="/notes">Notes</Link>
      </div>
    </nav>
  );
};

export default Navbar;
