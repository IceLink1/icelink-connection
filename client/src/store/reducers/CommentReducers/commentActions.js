import { createAsyncThunk } from "@reduxjs/toolkit";
import iceAxios from "../../../axios";

export const getComments = createAsyncThunk("/comment/get", async () => {
  try {
    const respone = await iceAxios.get(`/lastcomment`);
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});

export const createComments = createAsyncThunk("/comment/set", async (data) => {
  try {
    const respone = await iceAxios.post(
      "/comment",
      { PostId: data.id, text: data.text },
      { headers: { authorization: data.token } }
    );
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});
