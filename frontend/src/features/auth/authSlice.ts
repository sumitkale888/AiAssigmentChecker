import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: {
    authenticated: false,
    user: ''
  }
};

export const authSlice = createSlice({
  name: 'authStatus',
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.authStatus = {
        authenticated: action.payload.authenticated,
        user: action.payload.user
      };
    }
  }
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;
