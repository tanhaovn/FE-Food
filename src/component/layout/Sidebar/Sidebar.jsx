import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar">
      <ul>
        <li className="dropdown">
          <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
            Products
          </div>
          {open && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/product-categorie">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/product-list">Product List</NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/order">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
