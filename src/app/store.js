import authSlice from "@/features/auth/authSlice";

import studentSlice from "@/features/students/studentSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
  },
});
