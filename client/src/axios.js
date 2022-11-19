import Axios from "axios";

export const makeRequest = Axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});
