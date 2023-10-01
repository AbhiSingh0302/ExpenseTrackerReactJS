import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "authorization",
  initialState: initialAuthState,
  reducers: {
    updateLogIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = "";
      if (localStorage.getItem("auth-token")) {
        localStorage.removeItem("auth-token");
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
