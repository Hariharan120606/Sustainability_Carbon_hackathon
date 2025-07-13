import React from 'react';
import { Building2 } from 'lucide-react';
import WarehouseCard from './WarehouseCard';

const WarehouseGrid = ({warehouses, onDeleteWarehouse }) => {
  if (warehouses.length === 0) {
    return (
      <div className="text-center py-5">
        <Building2 size={64} className="text-muted mb-3" />
        <h5 className="text-secondary mb-2">No warehouses found</h5>
        <p className="text-muted">Try adjusting your search criteria or add a new warehouse.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {warehouses.map((warehouse) => (
        <div key={warehouse.id} className="col-12 col-lg-6 col-xl-4">
          <WarehouseCard warehouse={warehouse} onDelete={onDeleteWarehouse} />
        </div>
      ))}
    </div>
  );
};

export default WarehouseGrid;
