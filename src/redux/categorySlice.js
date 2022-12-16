import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
});

export default categorySlice.reducer;

export const { setCategories } = categorySlice.actions;
