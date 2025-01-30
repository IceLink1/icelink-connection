import { createAsyncThunk } from "@reduxjs/toolkit";
import iceAxios from "../../../axios";

export const getPosts = createAsyncThunk("/posts/get", async (data) => {
  try {
    const respone = await iceAxios.get(`/posts?page=${data.page}&limit=${data.limit}`);
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});

export const getById = createAsyncThunk("/posts/:id", async (data) => {
  try {
    const respone = await iceAxios.get(`/posts/${data.id}`);
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});

export const createPost = createAsyncThunk("/posts/create", async (data) => {
  try {
    const respone = await iceAxios.post(
      "/posts",
      {
        imageUrl: data.imageUrl,
        title: data.title,
        text: data.text,
        tags: data.tags,
      },
      {
        headers: { authorization: data.token },
      }
    );
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});
