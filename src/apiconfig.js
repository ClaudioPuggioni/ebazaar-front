import axios from "axios";

const BASE_URL = "https://ebazaar-back.herokuapp.com"; // http://localhost:8000/

const axiosClient = axios.create({
  baseURL: BASE_URL,
  //   headers: {
  //     "content-type": "application/json",
  //   },
});

axiosClient.interceptors.request.use(
  (requestConfig) => {
    if (requestConfig.url !== "/login" || requestConfig.url !== "/signup") {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        requestConfig.headers["Authorization"] = "Bearer " + accessToken;
      }
      return requestConfig;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const errCode = err.response.status;
    console.log(originalConfig);
    if ((errCode === 401 && originalConfig.url === "auth/token") || (errCode === "401" && originalConfig.url === "auth/token")) {
      return Promise.reject(err);
    }
    if (errCode === 401 || errCode === "401") {
      const tokenResponse = await axiosClient.post("auth/token", {
        token: localStorage.getItem("refresh_token"),
      });
      localStorage.setItem("access_token", tokenResponse.data.accessToken);
      localStorage.setItem("refresh_token", tokenResponse.data.refreshToken);
      return axiosClient(originalConfig);
    }
    return Promise.reject(err);
  }
);

export { BASE_URL };

export default axiosClient;
