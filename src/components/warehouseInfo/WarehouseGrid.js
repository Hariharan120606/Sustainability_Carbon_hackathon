// import React, { useState, useEffect } from 'react';
// import { Plus, Trash2, MapPin, Zap, Droplets, Recycle, TreePine, Building2, Search, Filter, TrendingUp, Award } from 'lucide-react';
// import WarehouseCard from "./WarehouseCard"

// const WarehouseGrid = ({ warehouses, onDeleteWarehouse }) => {
//   if (warehouses.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-gray-600 mb-2">No warehouses found</h3>
//         <p className="text-gray-500">Try adjusting your search criteria or add a new warehouse.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//       {warehouses.map((warehouse) => (
//         <WarehouseCard 
//           key={warehouse.id} 
//           warehouse={warehouse} 
//           onDelete={onDeleteWarehouse}
//         />
//       ))}
//     </div>
//   );
// };

// export default WarehouseGrid;

import React from 'react';
import { Building2 } from 'lucide-react';
import WarehouseCard from './WarehouseCard';

const WarehouseGrid = ({ warehouses, onDeleteWarehouse }) => {
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
