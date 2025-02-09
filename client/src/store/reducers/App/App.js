import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ModalIsOpen: false,
  isLoading: false,
  error: "",
};

const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    close: (state) => {
      state.ModalIsOpen = false;
    },
    open: (state) => {
      state.ModalIsOpen = true;
    },
  },
  extraReducers: () => {},
});

export const { close, open } = AppSlice.actions;
export default AppSlice.reducer;
