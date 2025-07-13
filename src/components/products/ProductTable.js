import React, { useState } from 'react';
import '../../../src/ProductTable.css';

const ProductTable = ({ products, onDelete, onUpdate, loading, error }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFields, setEditFields] = useState({ price: '', quantity: '' });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFields({ price: product.price, quantity: product.quantity });
  };

  const handleSave = () => {
    onUpdate(editingProduct.product_id, editFields);
    setEditingProduct(null);
  };

  if (loading)
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" />
      </div>
    );

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <div className="table-responsive table-dark">
        <table className="table table-bordered table-hover shadow-sm table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Warehouse</th>
              <th>Manufacture</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>{p.warehouse_id}</td>
                <td>{p.manufacture_date?.split('T')[0]}</td>
                <td>{p.expiry_date?.split('T')[0]}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(p.product_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content shadow bg-dark">
              <div className="modal-header">
                <h5 className="modal-title">Update Product #{editingProduct.product_id}</h5>
                <button type="button" className="btn-close" onClick={() => setEditingProduct(null)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editFields.price}
                    onChange={(e) => setEditFields({ ...editFields, price: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editFields.quantity}
                    onChange={(e) => setEditFields({ ...editFields, quantity: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
