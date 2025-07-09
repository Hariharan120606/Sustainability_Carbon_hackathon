// import React, { useState, useEffect } from 'react';
// import { Plus, Trash2, MapPin, Zap, Droplets, Recycle, TreePine, Building2, Search, Filter, TrendingUp, Award } from 'lucide-react';

// const WarehouseSearch = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           <input
//             type="text"
//             placeholder="Search warehouses by name or location..."
//             value={searchTerm}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Filter className="h-5 w-5 text-gray-400" />
//           <select
//             value={sortBy}
//             onChange={(e) => onSortChange(e.target.value)}
//             className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           >
//             <option value="sustainabilityScore">Sustainability Score</option>
//             <option value="size">Size</option>
//             <option value="name">Name</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WarehouseSearch

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

