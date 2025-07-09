import React, { useState } from 'react';
import { addWarehouse } from '../../features/warehouseActions';
import { useDispatch } from 'react-redux';

const WarehouseForm = ({ isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: null,
    manager_id: null,
    name: '',
    location: '',
    address: '',
    size: '',
    energyEfficiency: 80,
    waterUsage: '',
    wasteReduction: 75,
    solarPanels: false,
    greenCertification: 'None',
    carbonFootprint: '',
    sustainabilityScore: 75
  });

  const certificationOptions = [
    'None',
    'LEED Certified',
    'LEED Silver',
    'LEED Gold',
    'LEED Platinum',
    'BREEAM Good',
    'BREEAM Very Good',
    'BREEAM Excellent',
    'BREEAM Outstanding'
  ];

  const handleSubmit = () => {
    if (
      !formData.id ||
      !formData.manager_id ||
      !formData.name ||
      !formData.location ||
      !formData.address ||
      !formData.size ||
      !formData.waterUsage ||
      !formData.carbonFootprint
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const warehouse = {
      ...formData,
      size: parseInt(formData.size),
      waterUsage: parseInt(formData.waterUsage),
      carbonFootprint: parseInt(formData.carbonFootprint)
    };

    // onSubmit(warehouse);
    dispatch(addWarehouse(warehouse));


    // Reset form
    setFormData({
      id: null,
      manager_id: null,
      name: '',
      location: '',
      address: '',
      size: '',
      energyEfficiency: 80,
      waterUsage: '',
      wasteReduction: 75,
      solarPanels: false,
      greenCertification: 'None',
      carbonFootprint: '',
      sustainabilityScore: 75
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="bg-dark modal-dialog modal-lg modal-dialog-centered">
        <div className="bg-dark modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Sustainable Warehouse</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Warehouse ID</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.id || ''}
                  onChange={(e) => handleInputChange('id', parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Manager ID</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.manager_id || ''}
                  onChange={(e) => handleInputChange('manager_id', parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Warehouse Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Size (sq ft)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Water Usage (L/month)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.waterUsage}
                  onChange={(e) => handleInputChange('waterUsage', e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Energy Efficiency (%)</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100"
                  value={formData.energyEfficiency}
                  onChange={(e) =>
                    handleInputChange('energyEfficiency', parseInt(e.target.value))
                  }
                />
                <div className="form-text">{formData.energyEfficiency}%</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Waste Reduction (%)</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100"
                  value={formData.wasteReduction}
                  onChange={(e) =>
                    handleInputChange('wasteReduction', parseInt(e.target.value))
                  }
                />
                <div className="form-text">{formData.wasteReduction}%</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Carbon Footprint (tonnes CO₂/year)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.carbonFootprint}
                  onChange={(e) => handleInputChange('carbonFootprint', e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Green Certification</label>
                <select
                  className="form-select"
                  value={formData.greenCertification}
                  onChange={(e) => handleInputChange('greenCertification', e.target.value)}
                >
                  {certificationOptions.map((cert) => (
                    <option key={cert} value={cert}>
                      {cert}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.solarPanels}
                    onChange={(e) => handleInputChange('solarPanels', e.target.checked)}
                    id="solarPanels"
                  />
                  <label className="form-check-label" htmlFor="solarPanels">
                    Solar Panels Installed
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Overall Sustainability Score (%)</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100"
                  value={formData.sustainabilityScore}
                  onChange={(e) =>
                    handleInputChange('sustainabilityScore', parseInt(e.target.value))
                  }
                />
                <div className="form-text">{formData.sustainabilityScore}%</div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
              Add Warehouse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseForm;
