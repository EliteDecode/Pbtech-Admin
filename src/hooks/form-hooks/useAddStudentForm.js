import { addStudent, reset } from "@/features/students/studentSlice";
import { addStudentSchema } from "@/lib/schemas";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAddStudentForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { isError, isSuccess, isLoading, message, singleStudent } = useSelector(
    (state) => state.student
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && message == "student added successfully") {
      toast.success("Congratulations student added successfully");
      navigate(`/dashboard/students/${singleStudent?.data?.studentId}`);
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess && isError) {
      dispatch(reset());
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      course: "",
      fullname: "",
      email: "",
      address: "",
      phone: "",
      endDate: "",
    },
    validationSchema: addStudentSchema,
    onSubmit: async (values) => {
      dispatch(addStudent(values));
    },
  });

  const handleImageChange = () => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue("picture", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return { isLoading: isLoading || loading, formik, handleImageChange };
};

export default useAddStudentForm;
