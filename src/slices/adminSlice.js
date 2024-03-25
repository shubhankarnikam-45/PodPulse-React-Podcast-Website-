import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminState: false,
};

console.log("admin slice")

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminState: (state, action) => {

      state.adminState = action.payload;
    },
    clearAdminState: (state) => {
      state.adminState = null;
    },
  },
});

export const { setAdminState, clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
