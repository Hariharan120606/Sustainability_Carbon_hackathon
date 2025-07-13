import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    getProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    getProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(
        (p) => p.product_id !== action.payload
      );
    },
    updateProductSuccess: (state, action) => {
      const updated = action.payload;
      const index = state.products.findIndex(p => p.product_id === updated.product_id);
      if (index !== -1) {
        state.products[index] = updated;
      }
    },
    clearProductError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  addProductSuccess,
  deleteProductSuccess,
  updateProductSuccess,
  clearProductError,
} = productSlice.actions;

export default productSlice.reducer;
