import {
  getWarehousesStart,
  getWarehousesSuccess,
  getWarehousesFailure,
  addWarehouseSuccess,
  deleteWarehouseSuccess
} from '../slices/WarehouseSlice';

// Fetch all warehouses
export const fetchWarehouses = () => async (dispatch) => {
  dispatch(getWarehousesStart());
  try {
    const res = await fetch('http://localhost:5001/warehouse',{
      method: 'GET'
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch');

    dispatch(getWarehousesSuccess(data));
  } catch (err) {
    dispatch(getWarehousesFailure(err.message));
  }
};

// Add a new warehouse
export const addWarehouse = (warehouseData) => async (dispatch) => {
  try {
    const res = await fetch('http://localhost:5001/warehouse/addwarehouse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(warehouseData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to add warehouse');

    dispatch(addWarehouseSuccess(data));
  } catch (err) {
    dispatch(getWarehousesFailure(err.message));
  }
};

// Get warehouses by manager ID
export const fetchWarehousesByManager = (managerId) => async (dispatch) => {
  dispatch(getWarehousesStart());
  try {
    const res = await fetch(`http://localhost:5001/warehouse/manager/${managerId}`,{
        method: 'GET'
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch by manager');

    dispatch(getWarehousesSuccess(data));
  } catch (err) {
    dispatch(getWarehousesFailure(err.message));
  }
};

export const deleteWarehouse = (id) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5001/warehouse/deletewarehouse/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to delete warehouse');

    dispatch(deleteWarehouseSuccess(id));
  } catch (err) {
    dispatch(getWarehousesFailure(err.message));
  }
};
