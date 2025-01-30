import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthReducers/AuthReduser";
import PostSlice from "./reducers/PostReducers/PostSlice";
import CommentSlice from "./reducers/CommentReducers/commentSlice";


export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    post: PostSlice,
    comment:CommentSlice,
  },
});
