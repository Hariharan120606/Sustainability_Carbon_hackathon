import { createSlice } from '@reduxjs/toolkit';

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState: {
    warehouses: [],
    loading: false,
    error: null,
  },
  reducers: {
    getWarehousesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getWarehousesSuccess: (state, action) => {
      state.warehouses = action.payload;
      state.loading = false;
    },
    getWarehousesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addWarehouseSuccess: (state, action) => {
      state.warehouses.push(action.payload);
    },
    deleteWarehouseSuccess: (state, action) => {
      state.warehouses = state.warehouses.filter(
        (w) => w.id !== action.payload
      );
    },
    clearWarehouseError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getWarehousesStart,
  getWarehousesSuccess,
  getWarehousesFailure,
  addWarehouseSuccess,
  clearWarehouseError,
  deleteWarehouseSuccess,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
