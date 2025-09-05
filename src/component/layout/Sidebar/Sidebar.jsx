import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a className="active" href="#home">Home</a></li>
        <li><a href="#user">User</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  )
}

export default Sidebar
