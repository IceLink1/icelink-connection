import axios from "axios";

export const API = import.meta.env.VITE_API || "http://localhost:4444";
export const APIWS = "https://76db1d59-f6a5-4bb3-bdcc-0ea52bfaa653.us-east-1.cloud.genez.io/";

const iceAxios = axios.create({
  baseURL: API,
});

// iceAxios.defaults.headers.common["Authorization"] = "";

export default iceAxios;
