import { createAsyncThunkWithHandler } from "../api";
import authService from "./authService";
import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("PBT_access_Token");

const initialState = {
  token: token ? JSON.parse(token) : null,
  isLoading: false,
  message: "",
  isSuccess: false,
  isError: false,
};

export const login = createAsyncThunkWithHandler(
  "auth/login",
  async (user, _) => {
    return await authService.login_admin(user);
  }
);

export const logout = createAsyncThunkWithHandler("auth/logout", async () => {
  return await authService.logout_admin();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Login Successfully";
        state.token = action.payload.data.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        state.isSuccess = false;
      })

      .addCase(logout.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, _) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Logout successfully";
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        state.isSuccess = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
