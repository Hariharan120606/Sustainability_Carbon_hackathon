import React from 'react';
import { Link } from 'react-router-dom';
import '../sidebar.css';

function Sidebar({ isOpen, closebar }) {
  return (
    <div
      id="mySidebar"
      className="sidebar fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
      style={{
        width: isOpen ? '220px' : '0',
        transition: 'width 0.3s ease',
      }}
    >
      <button className="closebtn my-4" onClick={closebar}>×</button>
      <Link to="/about" style = {{marginTop : "25px"}}>📊 About Us</Link>
      <Link to="/login/warehouse">🏢 Warehouses</Link>
      <Link to="/login/products">📦 Products</Link>
      <Link to="/login/statistics">📈 Statistics</Link>
      <Link to="/login/carbonemission">🌱 Carbon Emission</Link>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700" style = {{marginTop : "100px"}}>
          <div className="text-xs text-gray-400 text-center">
            © 2025 Your Company
          </div>
      </div>
    </div>
  );
}

export default Sidebar;
