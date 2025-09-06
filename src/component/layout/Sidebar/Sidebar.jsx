import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/product">Products</NavLink></li>
        <li><NavLink to="/order">Orders</NavLink></li>
      </ul>
    </div>
  )
}

export default Sidebar
