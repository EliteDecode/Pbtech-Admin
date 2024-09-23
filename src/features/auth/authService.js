import axiosClient from "../axiosClient";

const login_admin = async (userData) => {
  const response = await axiosClient.post(`/admin/auth/login`, userData);

  if (response.data.success === true) {
    localStorage.setItem("PBT_access_Token", response.data.data.accessToken);
    localStorage.setItem("PBT_refresh_Token", response.data.data.refreshToken);
  }

  console.log(response.data);
  return response.data;
};

export const logout_admin = async () => {
  const refreshToken = localStorage.getItem("PBT_refresh_Token");
  if (!refreshToken) {
    return;
  }

  const response = await axiosClient.post("/admin/auth/logout", {
    refreshToken: JSON.parse(refreshToken),
  });

  if (response.data.success === true) {
    localStorage.removeItem("PBT_access_Token");
    localStorage.removeItem("PBT_refresh_Token");
  }

  return response.data;
};

const authService = {
  login_admin,
  logout_admin,
};

export default authService;
