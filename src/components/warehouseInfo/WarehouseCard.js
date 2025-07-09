// import React, { useState, useEffect } from 'react';
// import { Plus, Trash2, MapPin, Zap, Droplets, Recycle, TreePine, Building2, Search, Filter, TrendingUp, Award } from 'lucide-react';

// const WarehouseCard = ({ warehouse, onDelete }) => {
//   const getSustainabilityColor = (score) => {
//     if (score >= 90) return 'text-emerald-600 bg-emerald-50';
//     if (score >= 80) return 'text-green-600 bg-green-50';
//     if (score >= 70) return 'text-yellow-600 bg-yellow-50';
//     return 'text-red-600 bg-red-50';
//   };

//   const getSustainabilityBadge = (score) => {
//     if (score >= 90) return { text: 'Excellent', color: 'bg-emerald-500' };
//     if (score >= 80) return { text: 'Good', color: 'bg-green-500' };
//     if (score >= 70) return { text: 'Fair', color: 'bg-yellow-500' };
//     return { text: 'Poor', color: 'bg-red-500' };
//   };

//   const badge = getSustainabilityBadge(warehouse.sustainabilityScore);

//   return (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100">
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">{warehouse.name}</h3>
//             <div className="flex items-center text-gray-600 mb-2">
//               <MapPin className="h-4 w-4 mr-1" />
//               <span className="text-sm">{warehouse.location}</span>
//             </div>
//             <p className="text-xs text-gray-500">{warehouse.address}</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color} text-white`}>
//               {badge.text}
//             </span>
//             <button
//               onClick={() => onDelete(warehouse.id)}
//               className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Size</span>
//             <span className="font-medium">{warehouse.size.toLocaleString()} sq ft</span>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Sustainability Score</span>
//             <span className={`font-bold px-2 py-1 rounded ${getSustainabilityColor(warehouse.sustainabilityScore)}`}>
//               {warehouse.sustainabilityScore}%
//             </span>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mt-4">
//             <div className="flex items-center space-x-2">
//               <Zap className="h-4 w-4 text-yellow-500" />
//               <div>
//                 <p className="text-xs text-gray-500">Energy Efficiency</p>
//                 <p className="text-sm font-medium">{warehouse.energyEfficiency}%</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Droplets className="h-4 w-4 text-blue-500" />
//               <div>
//                 <p className="text-xs text-gray-500">Water Usage</p>
//                 <p className="text-sm font-medium">{warehouse.waterUsage}L</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Recycle className="h-4 w-4 text-green-500" />
//               <div>
//                 <p className="text-xs text-gray-500">Waste Reduction</p>
//                 <p className="text-sm font-medium">{warehouse.wasteReduction}%</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <TreePine className="h-4 w-4 text-emerald-500" />
//               <div>
//                 <p className="text-xs text-gray-500">Carbon Footprint</p>
//                 <p className="text-sm font-medium">{warehouse.carbonFootprint}t CO₂</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Solar Panels</span>
//               <span className={`px-2 py-1 rounded-full text-xs ${warehouse.solarPanels ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
//                 {warehouse.solarPanels ? 'Installed' : 'Not Installed'}
//               </span>
//             </div>
//             <div className="flex items-center justify-between mt-2">
//               <span className="text-sm text-gray-600">Certification</span>
//               <span className="text-sm font-medium text-green-600">{warehouse.greenCertification}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WarehouseCard

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
