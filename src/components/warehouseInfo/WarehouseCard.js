import React from 'react';
import { Trash2, MapPin, Zap, Droplets, Recycle, TreePine, Building2 } from 'lucide-react';

const WarehouseCard = ({ warehouse, onDelete }) => {
  const getSustainabilityBadge = (score) => {
    if (score >= 90) return { text: 'Excellent', color: 'success' };
    if (score >= 80) return { text: 'Good', color: 'primary' };
    if (score >= 70) return { text: 'Fair', color: 'warning' };
    return { text: 'Poor', color: 'danger' };
  };

  const badge = getSustainabilityBadge(warehouse.sustainabilityScore);

  return (
    <div className="bg-dark card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title mb-1">{warehouse.name}</h5>
            <div className="text-muted small d-flex align-items-center">
              <MapPin size={14} className="me-1" /> {warehouse.location}
            </div>
            <div className="text-muted small">{warehouse.address}</div>
          </div>
          <div className="d-flex align-items-center">
            <span className={`badge bg-${badge.color} me-2`}>{badge.text}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(warehouse.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <ul className="bg-dark list-group list-group-flush mb-3">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Size</span>
            <span>{warehouse.size} sq ft</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Sustainability Score</span>
            <span>{warehouse.sustainabilityscore}%</span>
          </li>
        </ul>

        <div className="row text-center mb-3">
          <div className="col-6">
            <Zap size={16} className="text-warning mb-1" />
            <div className="small">{warehouse.energyefficiency}% Energy Efficiency</div>
          </div>
          <div className="col-6">
            <Droplets size={16} className="text-primary mb-1" />
            <div className="small">{warehouse.waterusage}L Water</div>
          </div>
          <div className="col-6 mt-2">
            <Recycle size={16} className="text-success mb-1" />
            <div className="small">{warehouse.wastereduction}% Waste Reduction</div>
          </div>
          <div className="col-6 mt-2">
            <TreePine size={16} className="text-success mb-1" />
            <div className="small">{warehouse.carbonfootprint}t CO₂</div>
          </div>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Solar Panels</span>
            <span className={`badge bg-${warehouse.solarpanels ? 'success' : 'secondary'}`}>{warehouse.solarPanels ? 'Installed' : 'Not Installed'}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Certification</span>
            <span className="text-success fw-medium">{warehouse.greencertification}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WarehouseCard;
