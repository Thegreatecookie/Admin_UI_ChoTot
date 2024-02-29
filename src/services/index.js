import axios from "axios";

const URL = "http://localhost:3003";

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use((response) => response.data);

export { default as ACCOUNTAPI } from "./account";
export { default as ADDRESSAPI } from "./address";
export default instance;
