import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    authState: authSlice,
    categoryState: categorySlice,
    cartState: cartSlice,
  },
});
