import { createSlice } from "@reduxjs/toolkit";
import { createComments, getComments } from "./commentActions";

const initialState = {
  isLoading: false,
  comments: [],
  error: "",
};

const CommentSlice = createSlice({
  name: "Comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(createComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.comments = action.payload;
        }
      })
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default CommentSlice.reducer;
