import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import productsSlice from "./products-slice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
