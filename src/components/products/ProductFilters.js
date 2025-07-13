import React from 'react';

const ProductFilters = ({ searchCategory, onSearchChange, sortBy, onSortChange }) => {
  return (
    <div className="d-flex justify-content-between mb-4">
      <input
        type="text"
        placeholder="Search by category"
        className="form-control me-2 w-50"
        value={searchCategory}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="form-select w-25"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Sort by Price</option>
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;
