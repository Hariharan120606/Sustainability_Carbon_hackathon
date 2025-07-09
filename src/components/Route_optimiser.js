import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import Navbar from "./Navbar";

const defaultWarehouses = [
  { label: "Warehouse A (Bangalore)", coords: [12.9716, 77.5946] },
  { label: "Warehouse B (Mysore)", coords: [12.2958, 76.6394] },
  { label: "Warehouse C (Chennai)", coords: [13.0827, 80.2707] },
  { label: "Warehouse D (Coimbatore)", coords: [11.0168, 76.9558] },
];

function Route_optimiser() {
  const [warehouses, setWarehouses] = useState(defaultWarehouses);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [route, setRoute] = useState([]);
  const [savings, setSavings] = useState(null);

  const addWarehouse = async (address) => {
    const key = process.env.REACT_APP_OPENCAGE_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${key}`;
    try {
      const res = await axios.get(url);
      if (res.data.results.length > 0) {
        const result = res.data.results[0];
        const lat = result.geometry.lat;
        const lng = result.geometry.lng;
        const name = result.formatted;
        setWarehouses((prev) => [...prev, { label: name, coords: [lat, lng] }]);
      } else {
        alert("Address not found.");
      }
    } catch (err) {
      alert("Geocoding failed.");
      console.error(err);
    }
  };

  const calculateDistance = (points) => {
    let dist = 0;
    for (let i = 1; i < points.length; i++) {
      const [lat1, lon1] = points[i - 1];
      const [lat2, lon2] = points[i];
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      dist += 6371 * c;
    }
    return dist;
  };

  const optimizeRoute = async () => {
    if (!start || !end || start.label === end.label) {
      alert("Select different start and end");
      return;
    }
    const others = warehouses.filter((w) => w !== start && w !== end);
    const locations = [start.coords, ...others.map((w) => w.coords), end.coords];
    const demands = Array(locations.length).fill(1);
    demands[0] = 0;
    const capacity = demands.reduce((a, b) => a + b, 0);

    const res = await axios.post("http://localhost:3001/optimize", {
      locations,
      demands,
      vehicle_capacity: capacity,
    });

    const ordered = res.data.route.map((idx) => locations[idx]);
    setRoute(ordered);

    const normalDistance = calculateDistance(locations);
    const optimizedDistance = calculateDistance(ordered);
    const petrolSaved = (normalDistance - optimizedDistance) * 0.1; // assuming 0.1L/km
    setSavings(petrolSaved.toFixed(2));
  };

  return (
    <div className="app">
      <Navbar/>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter address"
          onKeyDown={(e) => e.key === "Enter" && addWarehouse(e.target.value)}
        />
        <button onClick={() => addWarehouse(document.querySelector("input").value)}>Add</button>
      </div>
      <div className="dropdowns">
        <Select options={warehouses} getOptionLabel={(o) => o.label} getOptionValue={(o) => o.label} onChange={setStart} placeholder="Start"/>
        <Select options={warehouses} getOptionLabel={(o) => o.label} getOptionValue={(o) => o.label} onChange={setEnd} placeholder="End"/>
        <button onClick={optimizeRoute}>Optimize</button>
      </div>
      {route.length > 0 && (
        <MapContainer center={route[0]} zoom={7} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={route} color="green" />
          {route.map((pos, idx) => (
            <Marker key={idx} position={pos}>
              <Popup>Stop {idx + 1}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      {savings && (
        <div className="results">
          <p>Estimated petrol saved: <strong>{savings} Liters</strong></p>
        </div>
      )}
    </div>
  );
}

export default Route_optimiser;
