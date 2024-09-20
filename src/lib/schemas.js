import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const addStudentSchema = yup.object().shape({
  fullname: yup.string().required("First name is required"),
  email: yup.string().email().required("Students email is required"),
  address: yup.string().required("Address is required"),
  course: yup.string().required("Course is required"),
  phone: yup.string().required("Phone number is required"),
  endDate: yup.date().required("Date ended is required").nullable(),
});
