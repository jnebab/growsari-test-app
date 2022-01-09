import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: Array<{
      id: number;
      display_name: string;
      barcode: string | number;
      price: number;
      brand: string | number;
      category: string;
    }>(),
  },
  reducers: {
    addItemToCart(state, action) {
      const { payload: newProduct } = action;
      const newIndex = state.cartItems.length;
      state.cartItems[newIndex] = newProduct;
    },
    removeItemFromCart(state, action) {
      const { payload: id } = action;
      state.cartItems = state.cartItems.filter((item: any) => item.id !== id);
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
