import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-title">URL Shortener</Link>
      </div>
      <div className="navbar-links">
        <Link to="/history" className="navbar-link">History</Link>
        <Link to="/login" className="navbar-link navbar-login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;