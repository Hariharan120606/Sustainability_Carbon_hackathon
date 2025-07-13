import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Warehouses from "./components/warehouseInfo/Warehouses.js";
import ProductList from "./components/products/ProductList.js";
import RouteOptimizer from "./components/RouteOptimizer.js";
import Statistics from "./components/Statistics.js";
import CarbonEmissionDashboard from "./components/CarbonEmissionDashboard.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register role="admin" />} />
        <Route path="/login/routeoptimiser" element={<RouteOptimizer />} />
        <Route path="/login/warehouse" element={<Warehouses />} />
        <Route path="/login/products" element={<ProductList />} />
        <Route path="/login/statistics" element={<Statistics />} />
        <Route path="/login/carbonemission" element={<CarbonEmissionDashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
