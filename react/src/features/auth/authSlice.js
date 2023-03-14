import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  userToken: localStorage.getItem("TOKEN") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_CURRENT_USER: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      if (token) {
        state.userToken = token;
        localStorage.setItem("TOKEN", token);
      }
    },
    REMOVE_CURRENT_USER: (state) => {
      state.user = {};
      state.userToken = null;
      localStorage.removeItem("TOKEN");
    },
  },
});

export const { SET_CURRENT_USER, REMOVE_CURRENT_USER } = authSlice.actions;
export default authSlice.reducer;
