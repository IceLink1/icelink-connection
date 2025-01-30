import { createSlice } from "@reduxjs/toolkit";
import { login, register, check, update, getById } from "./AuthActions";

const initialState = {
  isAuth: false,
  userData: {},
  someUserData: {},
  isLoading: false,
  error: "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.userData = action.payload;
          state.isAuth = true;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.userData = action.payload;
          state.isAuth = true;
        }
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(check.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.userData = action.payload;
          state.isAuth = true;
        }
      })
      .addCase(check.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(check.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.userData = action.payload;
          state.isAuth = true;
        }
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        if (action.payload) {
          state.someUserData = action.payload;
        }
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
        state.someUserData = {};
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
