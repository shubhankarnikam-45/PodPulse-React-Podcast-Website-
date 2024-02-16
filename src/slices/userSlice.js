import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};


//2. using redux toolkit the 'reducer' and the 'action' in one file.
//useslice is responsile for the 'user change' and 'podcastSlice' is responsile.
//for the podcast change.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
