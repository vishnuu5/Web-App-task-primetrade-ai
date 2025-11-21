import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  if (baseURL && typeof config.url === "string" && config.url.startsWith("/api")) {
    config.url = config.url.replace(/^\/api/, "");
  }
  return config;
});

export default api;