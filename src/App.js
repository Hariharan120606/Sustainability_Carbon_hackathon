import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Register from "./components/Register"
import Route_optimiser from "./components/Route_optimiser"
import Dashboard from "./components/Dashboard.js"
import { useEffect, useState } from 'react';
import Warehouses from './components/warehouseInfo/Warehouses.js';

function App() {
   return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register role = "admin"/>} />
      <Route path="/route_optimser" element={<Route_optimiser />} />
      <Route path="/login/dashboard" element={<Dashboard />} />
      <Route path="/login/warehouse" element={<Warehouses />} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
