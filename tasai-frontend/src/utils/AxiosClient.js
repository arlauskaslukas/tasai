import axios from "axios";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      cookies.get("Authorization") !== undefined
        ? "Bearer " + cookies.get("Authorization")
        : "",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status == 401) {
      window.location.href = "https://localhost:3000/login";
    }
    console.log("Unauthorized");
    return Promise.reject(error);
  }
);

export default { axiosClient };
