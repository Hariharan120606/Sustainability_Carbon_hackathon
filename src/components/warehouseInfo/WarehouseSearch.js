import React from 'react';
import { Search, Filter } from 'lucide-react';

const WarehouseSearch = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
  return (
    <div className="bg-dark rounded shadow-sm p-4 mb-4 border border-success-subtle">
      <div className="row g-3 align-items-center">
        <div className="col-md-8 position-relative">
          <div className="position-relative">
            <Search
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y text-muted ms-3"
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search warehouses by name or location..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center gap-2">
          <Filter size={18} className="text-muted" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="form-select"
          >
            <option value="sustainabilityScore">Sustainability Score</option>
            <option value="size">Size</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default WarehouseSearch;

