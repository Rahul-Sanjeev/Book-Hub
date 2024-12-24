import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",  // Base URL for your Django API
  headers: {
    "Content-Type": "application/json",  // Set content-type to JSON
  },
});

export default api;
