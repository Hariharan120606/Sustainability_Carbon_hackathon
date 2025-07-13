import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  addProductSuccess,
  deleteProductSuccess,
  updateProductSuccess
} from '../slices/ProductSlice.js';

// ✅ Fetch all products
export const fetchProducts = () => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await fetch('http://localhost:5001/products', {
      method: 'GET',
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch');

    dispatch(getProductSuccess(data));
  } catch (err) {
    dispatch(getProductFailure(err.message));
  }
};

// ✅ Add a new product
export const addProduct = (productData) => async (dispatch) => {
  try {
    const res = await fetch('http://localhost:5001/products/addproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to add product');

    dispatch(addProductSuccess(data));
  } catch (err) {
    dispatch(getProductFailure(err.message));
  }
};

// ✅ Fetch products by warehouse ID
export const fetchProductsByWarehouseId = (warehouseId) => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await fetch(`http://localhost:5001/products/${warehouseId}`, {
      method: 'GET',
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch');

    dispatch(getProductSuccess(data));
  } catch (err) {
    dispatch(getProductFailure(err.message));
  }
};

// ✅ Delete a product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5001/products/deleteproduct/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to delete product');

    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(getProductFailure(err.message));
  }
};


export const updateProduct = (id, updatedFields) => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await fetch(`http://localhost:5001/products/updateproduct/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to update product');

    dispatch(updateProductSuccess(data));  
  } catch (err) {
    dispatch(getProductFailure(err.message));
  }
};
