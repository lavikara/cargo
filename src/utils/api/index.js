import axios from "axios";
import { getItem } from "../storage";

// export const baseUrl = "http://localhost:5000";

export const getHeaders = () => {
  let headers = {
    Authorization: "Bearer " + getItem("token"),
  };

  return headers;
};

const client = axios.create({
  baseURL: "https://cargostation.onrender.com",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 30000,
});

client.interceptors.request.use(
  (config) => {
    const token = getItem("token") || "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default client;
