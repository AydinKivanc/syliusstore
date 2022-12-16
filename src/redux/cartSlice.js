import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenValue: localStorage.getItem("cartTokenValue"),
  items: [],
  id: null,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setTokenValue: (state, action) => {
      console.log(">>> Set Token Value Action", action);

      localStorage.setItem("cartTokenValue", action.payload.tokenValue);

      state.tokenValue = action.payload.tokenValue;
    },
    updateFullCart: (state, action) => {
      console.log(">>> Set Full Data Action", action);
      return action.payload;
      // tum state i (initialState) bastan olusturacagimiz icin return dedik. initialState in uzerine yazacak. Her seferinde elimizde guncel cart bilgisi olacak.
      // Sadece items set edilecek olsaydi state.items = action.payload.items;  yazardik
    },
  },
});

export default cartSlice.reducer;

export const { setTokenValue, updateFullCart } = cartSlice.actions;
