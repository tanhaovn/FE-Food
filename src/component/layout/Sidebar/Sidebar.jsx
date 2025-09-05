import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a className="active" href="#dashboard">Dashboard</a></li>
        <li><a href="#product">Products</a></li>
        <li><a href="#order">Orders</a></li>
        <li><a href="#comment">Comments</a></li>
      </ul>
    </div>
  )
}

export default Sidebar
