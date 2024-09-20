import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentservice from "./studentService";
import { createAsyncThunkWithHandler } from "../api";

const initialState = {
  students: null,
  singleStudent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getStudents = createAsyncThunkWithHandler(
  "student/getStudents",
  async (_, thunkAPI) => {
    return await studentservice.getStudents();
  }
);

export const getSingleStudent = createAsyncThunkWithHandler(
  "student/getSingleStudent",
  async (id, thunkAPI) => {
    return await studentservice.getSingleStudent(id);
  }
);

export const addStudent = createAsyncThunkWithHandler(
  "student/addStudent",
  async (studentsData, thunkAPI) => {
    return await studentservice.addStudent(studentsData);
  }
);

export const updateStudent = createAsyncThunkWithHandler(
  "student/updateStudent",
  async (studentsData, thunkAPI) => {
    return await studentservice.updateStudent(studentsData);
  }
);

const studentSlice = createSlice({
  name: "student",
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
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "student added successfully";
        state.singleStudent = action.payload;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "student edited successfully";
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })

      .addCase(getSingleStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleStudent = action.payload;
      })
      .addCase(getSingleStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
