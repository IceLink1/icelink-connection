import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthReducers/AuthReduser";
import PostSlice from "./reducers/PostReducers/PostSlice";
import CommentSlice from "./reducers/CommentReducers/commentSlice";
import AppSlie from "./reducers/App/App"


export const store = configureStore({
  reducer: {
    app:AppSlie,
    auth: AuthSlice,
    post: PostSlice,
    comment:CommentSlice,
  },
});
