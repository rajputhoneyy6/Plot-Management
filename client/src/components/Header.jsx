import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import 'bootstrap-icons/font/bootstrap-icons.css';
import toast from "react-hot-toast";
import Logo from "../Images/logo.jpg";

import { useAuth } from "../context/AuthContext"; 

const Header = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4">
        {/* Logo on the left */}
        <NavLink className="navbar-brand" to="/">
          <img
            src={Logo}      
            alt="Logo"
            width="60"           
            height="60"
            className="d-inline-block align-text-top"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse ms-auto" id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <i className="bi bi-house-door-fill me-1"></i> Home
              </NavLink>
            </li>

            {/* About Us */}
            <li className="nav-item">
              <NavLink to="/aboutus" className="nav-link">
                <i className="bi bi-info-circle-fill me-1"></i> About Us
              </NavLink>
            </li>
            {/* Plot Grid */}
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/plot-availability">
                <i className="bi bi-grid-fill me-1"></i> Plot Availability
              </NavLink>
            </li>
            {/* Contact Us */}
            <li className="nav-item">
              <NavLink to="/contactus" className="nav-link">
                <i className="bi bi-envelope-fill me-1"></i> Contact Us
              </NavLink>
            </li>

            {/* Auth Links */}
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    <i className="bi bi-person-plus-fill me-1"></i> Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* User/Admin Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-1"></i> {user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {user.role === 1 && (
                      <li>
                        <NavLink
                          to="/dashboard/admin"
                          className="dropdown-item"
                        >
                          <i className="bi bi-speedometer2 me-1"></i> Dashboard
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="#"
                        className="dropdown-item"
                      >
                        <i className="bi bi-box-arrow-right me-1"></i> Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>

              </>
            )}  
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
