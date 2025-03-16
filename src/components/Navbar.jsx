import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/">MovieDB</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/top-rated">Top Rated</Link>
        <Link to="/upcoming">Upcoming</Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search movies..." />
      </div>
    </nav>
  );
}

export default Navbar;
