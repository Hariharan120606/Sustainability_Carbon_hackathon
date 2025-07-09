import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice.js"
import warehouseReducer from "./slices/WarehouseSlice.js"

const store =  configureStore({
  reducer: {
    user: userReducer,
    warehouse : warehouseReducer
  },
})

export default store;