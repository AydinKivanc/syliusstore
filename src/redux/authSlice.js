import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // TODO Get token from localStorage
  //token: null,
  token: localStorage.getItem("token"), //in the begining initialState token sholud come from localStorage,
  authCustomerName: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // TODO will done
      localStorage.setItem("token", action.payload.token); // updating localStorage
      state.token = action.payload.token; // updating state
      //this token coming from state          this token coming from action.payload
    },
    removeToken: (state, action) => {
      // TODO will done
      localStorage.removeItem("token"); // updating localStorage
      localStorage.removeItem("cartTokenValue"); // updating localStorage
      state.token = null; // updating state
    },
    setAuthCustomerName: (state, action) => {
      state.authCustomerName = action.payload.authCustomerName;
    },
  },
});

export default authSlice.reducer;

export const { setToken, removeToken, setAuthCustomerName } = authSlice.actions;

// *** (Satir 8) de Redux dan gelen createSlice i authSlice a atadigimiz icin, actionlari export ederken authSlice.actions yazdigimizda buradaki actions property si Redux dan createSlice ile gelir
// *** buradaki actions icinde reducers lari barindiran bir objedir " export const authSlice degiskenine createSlice fonksiyonu set edilir ve bu fonksiyon  objesini donen bir fonksiyondur.  "
// *** bu actions objesinden distructring yaparak { setToken, removeToken } icindeki property ler kullanilir.
