import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:3007/pbtech/api/v1",
  // baseURL: "https://bst-refer-backend.onrender.com/bst/v1",
  baseURL: "https://backend.purplebeetech.com/pbtech/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("PBT_access_Token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("PBT_refresh_Token");

      try {
        const response = await axiosClient.post(`/admin/auth/refresh-token`, {
          refreshToken: refreshToken,
        });
        const newAccessToken = response.data.data.accessToken;
        localStorage.setItem("PBT_access_Token", newAccessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
