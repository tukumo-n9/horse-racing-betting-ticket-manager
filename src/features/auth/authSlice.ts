import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    authUpdate(_state, action) {
      return action.payload;
    },
  },
});

export const { authUpdate } = authSlice.actions;

export default authSlice.reducer;
