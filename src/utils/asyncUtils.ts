import axios from "axios";

const httpClient = axios.create({
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  if (process.env.VITE_AUTH0) {
  }
  return config;
});

export { httpClient };
