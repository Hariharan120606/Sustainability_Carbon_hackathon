// ProductList.jsx (main)
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from '../../features/productActions';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import ProductFilters from './ProductFilters';


const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [showForm, setShowForm] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (formData) => {
    dispatch(addProduct(formData)).then(() => dispatch(fetchProducts()));
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      dispatch(deleteProduct(id)).then(() => dispatch(fetchProducts()));
    }
  };

  const handleUpdate = (id, updates) => {
    dispatch(updateProduct(id, updates)).then(() => dispatch(fetchProducts()));
  };

  const filteredProducts = products
    .filter((p) =>
      p.category.toLowerCase().includes(searchCategory.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'asc') return a.price - b.price;
      if (sortBy === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="d-flex">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} link_av="Home" />

      <div
        className="flex-grow-1"
        style={{
          transition: 'margin-left 0.3s ease',
          marginLeft: sidebarOpen ? '200px' : '0px',
          marginTop : '30px'
        }}
      >
        <div className="container py-4">
          <h2 style = {{color : "purple"}}>📦 Products</h2>
          <button className="btn btn-success mb-3" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide Form' : '➕ Add Product'}
          </button>

          {showForm && <ProductForm onSubmit={handleAddProduct} />}

          <ProductFilters
            searchCategory={searchCategory}
            onSearchChange={setSearchCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <ProductTable
            products={filteredProducts}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;