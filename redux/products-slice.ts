import { createSlice } from "@reduxjs/toolkit";
import products from "growsari_products";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: products,
    searchTerm: "",
  },
  reducers: {
    search(state, action) {
      const { payload: text } = action;
      if (text === "") {
        state.items = products;
        state.searchTerm = "";
        return;
      }
      state.searchTerm = text;
      state.items = state.items.filter(
        (product) =>
          product.display_name.toLowerCase().includes(text?.toLowerCase()) ||
          product.display_name.toLowerCase() === text.toLowerCase()
      );
    },
    filterByCategory(state, action) {
      const { payload: categoryName } = action;
      state.items = state.items.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      );
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
