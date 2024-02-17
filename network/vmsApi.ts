import axios, { AxiosInstance } from "axios";

const vmsApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default vmsApi;
