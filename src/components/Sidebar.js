import React from 'react';
import '../sidebar.css';

function Sidebar({ isOpen, closebar }) {
  return (
    <div
      id="mySidebar"
      className="sidebar"
      style={{
        width: isOpen ? '200px' : '0',
        transition: 'width 0.3s ease'
      }}
    >
      <button className="closebtn" onClick={closebar}>×</button>
      <a href="#">Best Route</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  );
}

export default Sidebar;
