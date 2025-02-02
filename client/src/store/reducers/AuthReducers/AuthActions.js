import { createAsyncThunk } from "@reduxjs/toolkit";
import iceAxios from "../../../axios";

export const register = createAsyncThunk("/auth/register", async (data) => {
  try {
    const respone = await iceAxios.post("/auth/register", data);
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const respone = await iceAxios.post("/auth/login", data);
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});

export const check = createAsyncThunk("/auth/me", async (data) => {
  try {
    const respone = await iceAxios.get("/auth/me", {
      headers: { authorization: data },
    });
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});

export const getById = createAsyncThunk("/auth/:id", async (data) => {
  try {
    const respone = await iceAxios.get(`/auth/${data._id}`);
    return respone.data;
  } catch (error) {
    console.error(error);
  }
});

export const update = createAsyncThunk("/auth/update", async (data) => {
  try {
    const respone = await iceAxios.put(
      "/auth/update",
      {
        bio: data.bio,
        location: data.location,
        sex: data.sex,
        birthday: data.birthday,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
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
