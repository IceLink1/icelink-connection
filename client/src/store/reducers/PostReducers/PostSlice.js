import { createSlice } from "@reduxjs/toolkit";
import { createPost, getPosts, getById } from "./PostActions";

const initialState = {
  isLoading: false,
  posts: [],
  openPost: {},
  pagination: {
    total: 1,
    page: 1,
    pages: 1,
    limit: 10,
  },
  error: "",
};

const PostSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.posts = action.payload.posts;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.openPost = action.payload;
        }
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default PostSlice.reducer;
