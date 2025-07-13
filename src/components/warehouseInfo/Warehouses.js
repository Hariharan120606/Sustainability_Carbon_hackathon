import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WarehouseSearch from './WarehouseSearch.js';
import WarehouseForm from './WarehouseForm.js';
import WarehouseGrid from './WarehouseGrid.js';
import WarehouseHeader from './WarehouseHeader.js';
import Navbar from '../../components/Navbar.js';
import {
  fetchWarehouses,
  addWarehouse,
  fetchWarehousesByManager,
  deleteWarehouse
} from '../../features/warehouseActions.js';

const Warehouses = () => {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.user.user); // e.g. "admin" or "manager"
  const username = useSelector((state) => state.user.username);
  const { warehouses, loading, error } = useSelector((state) => state.warehouse); // ← make sure your reducer name matches

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('sustainabilityScore');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // 🔄 Fetch warehouses when component mounts
  useEffect(() => {
    if (role === 'admin') {
      dispatch(fetchWarehouses());
    } else {
      dispatch(fetchWarehousesByManager(username));
    }
  }, [dispatch, role, username]);

  const handleDeleteWarehouse = (id) => {
    if (window.confirm('Are you sure you want to delete this warehouse?')) {
      dispatch(deleteWarehouse(id))
    }
  };

  const handleAddWarehouse = (warehouse) => {
    dispatch(addWarehouse(warehouse)); // ✅ pass the actual warehouse object
    setShowAddForm(false);
  };

  const filteredAndSortedWarehouses = (warehouses || [])
    .filter(
      (warehouse) =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'sustainabilityScore') return b.sustainabilityScore - a.sustainabilityScore;
      if (sortBy === 'size') return b.size - a.size;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const totalWarehouses = warehouses?.length || 0;
  const avgSustainabilityScore =
    totalWarehouses > 0
      ? Math.round(warehouses.reduce((sum, w) => sum + w.sustainabilityscore, 0) / totalWarehouses)
      : 0;
  const totalSize = warehouses?.reduce((sum, w) => sum + w.size, 0) || 0;
  const solarEnabled = warehouses?.filter((w) => w.solarpanels).length || 0;

  return (
    <div className="d-flex">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} link_av="Home" />

      <div
        className="flex-grow-1"
        style={{
          transition: 'margin-left 0.3s ease',
          marginLeft: sidebarOpen ? '200px' : '0px'
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-end" style={{ marginRight: '0px' }}>
            <div className="col-lg-12">
              <WarehouseHeader
                totalWarehouses={totalWarehouses}
                avgSustainabilityScore={avgSustainabilityScore}
                totalSize={totalSize}
                solarEnabled={solarEnabled}
                onAddWarehouse={() => setShowAddForm(true)}
              />

              <WarehouseSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              <WarehouseGrid
                warehouses={filteredAndSortedWarehouses}
                onDeleteWarehouse={handleDeleteWarehouse}
              />

              <WarehouseForm
                isOpen={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSubmit={handleAddWarehouse}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warehouses;
