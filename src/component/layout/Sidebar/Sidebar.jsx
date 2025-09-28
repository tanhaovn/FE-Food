import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">MyRestaurant</span>
        </div>
        
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item dropdown" ref={dropdownRef}>
              <div
                className={`dropdown-toggle ${open ? 'active' : ''}`}
                onClick={() => setOpen(!open)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
              >
                <span>Products</span>
                <svg 
                  className={`dropdown-arrow ${open ? 'rotated' : ''}`}
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              {open && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/product-categorie" onClick={() => setOpen(false)}>
                      <span className="menu-icon">📂</span>
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/product-list" onClick={() => setOpen(false)}>
                      <span className="menu-icon">📋</span>
                      List Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/table" onClick={() => setOpen(false)}>
                      <span className="menu-icon">🪑</span>
                      Tables
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                <span className="nav-icon">📊</span>
                Tableau de bord
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to="/order" className="nav-link">
                <span className="nav-icon">📝</span>
                Commandes
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="profile-section">
          <div className="profile">
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar utilisateur"
              className="avatar"
            />
            <div className="profile-info">
              <span className="profile-name">Admin</span>
              <span className="profile-role">Gestionnaire</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Sidebar;
