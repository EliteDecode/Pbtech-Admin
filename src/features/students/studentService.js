import axios from "axios";
import axiosClient from "../axiosClient";
const addStudent = async (data) => {
  const response = await axiosClient.post(`/student`, data);

  return response.data;
};

const getStudents = async () => {
  const response = await axiosClient.get(`/student`);

  return response.data;
};

const getSingleStudent = async (studentsId) => {
  const response = await axiosClient.get(`/student/${studentsId}`);

  return response.data;
};

const updateStudent = async (data) => {
  const { studentId, ...studentData } = data; // Correct destructuring
  const response = await axiosClient.put(`/student/${studentId}`, studentData);

  return response.data;
};

const productService = {
  addStudent,
  getStudents,
  updateStudent,
  getSingleStudent,
};

export default productService;
