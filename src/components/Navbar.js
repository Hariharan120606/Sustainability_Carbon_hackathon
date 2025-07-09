import React from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';

function Navbar({ sidebarOpen, toggleSidebar, link_av }) {
  return (
    <div>
      {/* Sidebar controlled by parent */}
      <Sidebar isOpen={sidebarOpen} closebar={toggleSidebar} />

      <nav className="navbar navbar-expand-lg navbar-light"
        style={{ height: "60px", background: "#004d40", color: "white" }}
      >
        <div className="d-flex align-items-center">
          <button className="openbtn btn btn-success me-3" onClick={toggleSidebar}>
            ☰ Menu
          </button>
        </div>

        <div className="d-flex justify-content-between w-100 align-items-center">
          <div>
            <Link className="navbar-brand text-white mx-3" to="/"
              style={{ textDecoration: link_av === "Home" ? "underline" : "none" }}
            >
              Home
            </Link>
            <Link className="navbar-brand text-white mx-3" to="/about"
              style={{ textDecoration: link_av === "Results" ? "underline" : "none" }}
            >
              About
            </Link>
            <Link className="navbar-brand text-white mx-3" to="/updates"
              style={{ textDecoration: link_av === "Updates" ? "underline" : "none" }}
            >
              Updates
            </Link>
            <Link className="navbar-brand text-white mx-3" to="#"
              style={{ textDecoration: link_av === "Help" ? "underline" : "none" }}
            >
              Help
            </Link>
          </div>

          <div className="d-flex align-items-center">
            <Link to="/login">
              <button type="button" className="btn btn-outline-light btn-sm mx-2">Login</button>
            </Link>
            <Link to="/register">
              <button type="button" className="btn btn-outline-light btn-sm mx-2">Register</button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
