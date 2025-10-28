import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null); 
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">MyRestaurant</span>
        </div>

        <nav className="navigation">
          <ul className="nav-list" ref={dropdownRef}>     
            <li className="nav-item dropdown">
              <div
                className={`dropdown-toggle ${openMenu === "products" ? "active" : ""}`}
                onClick={() => setOpenMenu(openMenu === "products" ? null : "products")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setOpenMenu(openMenu === "products" ? null : "products")
                }
              >
                <span>📦 Products</span>
                <svg
                  className={`dropdown-arrow ${openMenu === "products" ? "rotated" : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              {openMenu === "products" && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/product-categorie" onClick={() => setOpenMenu(null)}>
                      <span className="menu-icon">📂</span>
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/product-list" onClick={() => setOpenMenu(null)}>
                      <span className="menu-icon">📋</span>
                      List Product
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="nav-item dropdown">
              <div
                className={`dropdown-toggle ${openMenu === "order" ? "active" : ""}`}
                onClick={() => setOpenMenu(openMenu === "order" ? null : "order")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setOpenMenu(openMenu === "order" ? null : "order")
                }
              >
                <span>📝 Order</span>
                <svg
                  className={`dropdown-arrow ${openMenu === "order" ? "rotated" : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              {openMenu === "order" && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/table" onClick={() => setOpenMenu(null)}>
                      <span className="menu-icon">🪑</span>
                      Tables
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/order-product" onClick={() => setOpenMenu(null)}>
                      <span className="menu-icon">📦</span>
                      Order Product
                    </NavLink>
                  </li>
                </ul>
              )}
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
