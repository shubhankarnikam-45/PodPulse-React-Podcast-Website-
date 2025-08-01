import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";
import currentUserPodcastReducer from "./slices/currentUserPodcastSlice"
import adminReducer from "./slices/adminSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastReducer,
    currentUserPodcasts: currentUserPodcastReducer,
    admin : adminReducer
  },
});
