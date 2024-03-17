import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUserPodcasts: [],
};

const currentUserPodcastSlice = createSlice({
    name: "currentUserPodcasts",
    initialState,
    reducers: {
        setCurrentUserPodcasts: (state, action) => {
            state.currentUserPodcasts = action.payload;
        },
    },
});

export const { setCurrentUserPodcasts } = currentUserPodcastSlice.actions;
export default currentUserPodcastSlice.reducer;
