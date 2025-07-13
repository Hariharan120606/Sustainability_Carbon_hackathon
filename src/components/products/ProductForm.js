import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    name: '',
    category: '',
    brand: '',
    price: '',
    quantity: '',
    manufacture_date: '',
    expiry_date: '',
    warehouse_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      product_id: '',
      name: '',
      category: '',
      brand: '',
      price: '',
      quantity: '',
      manufacture_date: '',
      expiry_date: '',
      warehouse_id: '',
    });
  };

  return (
    <form className="border p-3 bg-light rounded shadow-sm mb-4 bg-dark" onSubmit={handleSubmit}>
      <div className="row">
        {[
          { label: 'Product ID', name: 'product_id', type: 'number' },
          { label: 'Name', name: 'name' },
          { label: 'Category', name: 'category' },
          { label: 'Brand', name: 'brand' },
          { label: 'Price (₹)', name: 'price', type: 'number' },
          { label: 'Quantity', name: 'quantity', type: 'number' },
          { label: 'MFG Date', name: 'manufacture_date', type: 'date' },
          { label: 'Expiry Date', name: 'expiry_date', type: 'date' },
          { label: 'Warehouse ID', name: 'warehouse_id', type: 'number' },
        ].map(({ label, name, type = 'text' }) => (
          <div className="col-md-3 mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              className="form-control"
              required
              value={formData[name]}
              onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ProductForm;
