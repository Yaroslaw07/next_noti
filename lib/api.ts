import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:3535",
  headers: {
    "Content-Type": "application/json",
  },
});
