import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice.js"
import warehouseReducer from "./slices/WarehouseSlice.js"
import productReducer from "./slices/ProductSlice.js"

const store =  configureStore({
  reducer: {
    user: userReducer,
    warehouse : warehouseReducer,
    product : productReducer
  },
})

export default store;