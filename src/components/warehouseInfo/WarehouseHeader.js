import React from 'react';
import { Plus, Zap, TrendingUp, Award, Building2 } from 'lucide-react';

const WarehouseHeader = ({ totalWarehouses, avgSustainabilityScore, totalSize, solarEnabled, onAddWarehouse }) => {
  return (
    <div className="bg-white rounded shadow-sm p-4 mb-4 border border-success-subtle">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
          <div className="bg-success text-white rounded p-2 d-flex align-items-center justify-content-center">
            <Building2 size={32} />
          </div>
          <div>
            <h1 className="h4 fw-bold text-dark mb-1">Sustainable Warehouse Management</h1>
            <p className="text-muted mb-0">Manage your eco-friendly warehouse network</p>
          </div>
        </div>
        <button
          onClick={onAddWarehouse}
          className="btn btn-success d-flex align-items-center gap-2 shadow-sm"
        >
          <Plus size={16} />
          <span>Add Warehouse</span>
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="row g-3">
        <div className="col-md-3">
          <div className="bg-primary text-white rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small mb-1">Total Warehouses</p>
                <h4 className="fw-bold mb-0">{totalWarehouses}</h4>
              </div>
              <Building2 size={28} className="text-light" />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-success text-white rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small mb-1">Avg Sustainability</p>
                <h4 className="fw-bold mb-0">{avgSustainabilityScore}%</h4>
              </div>
              <Award size={28} className="text-light" />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-purple text-white rounded p-3 h-100" style={{ backgroundColor: '#6f42c1' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small mb-1">Total Space</p>
                <h4 className="fw-bold mb-0">{(totalSize / 1000).toFixed(0)}K</h4>
                <p className="small text-light mb-0">sq ft</p>
              </div>
              <TrendingUp size={28} className="text-light" />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-warning text-white rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small mb-1">Solar Enabled</p>
                <h4 className="fw-bold mb-0">{solarEnabled}</h4>
                <p className="small text-light mb-0">facilities</p>
              </div>
              <Zap size={28} className="text-light" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseHeader;
