import axios from "axios";

export const API = import.meta.env.VITE_API || "http://localhost:4444";

const iceAxios = axios.create({
  baseURL: API,
});

// iceAxios.defaults.headers.common["Authorization"] = "";

export default iceAxios;
