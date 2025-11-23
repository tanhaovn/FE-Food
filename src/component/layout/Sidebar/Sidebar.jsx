import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import hao from "../../../assets/hao.jpg";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">MyRestaurant</span>
        </div>

        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="product-categorie"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="menu-icon">📂</span> Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="product-list"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="menu-icon">📋</span> List Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="table"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="menu-icon">🪑</span> Tables
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="order-product"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="menu-icon">📦</span> Order Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="order-item"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="menu-icon">🍽️</span> Order Item
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="profile-section">
          <div className="profile">
            <img src={hao} alt="avatar" className="avatar" />

            <div className="profile-info">
              <span className="profile-name">Phạm Tấn Hào</span>
              <span className="profile-role">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
