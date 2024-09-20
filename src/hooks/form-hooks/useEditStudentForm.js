import { reset, updateStudent } from "@/features/students/studentSlice";
import { addStudentSchema } from "@/lib/schemas";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const useEditStudentForm = () => {
  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, message, singleStudent } = useSelector(
    (state) => state.student
  );

  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && message == "student edited successfully") {
      toast.success("Congratulations student updated successfully");
      navigate("/dashboard/students");
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
      fullname: singleStudent?.data?.fullname || "",
      email: singleStudent?.data?.email || "",
      course: singleStudent?.data?.course || "",
      address: singleStudent?.data?.address || "",
      phone: singleStudent?.data?.phone || "",
      endDate: singleStudent?.data?.endDate || "",
    },
    validationSchema: addStudentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateStudent({ ...values, studentId: studentId }));
    },
  });

  return { formik, isLoading };
};

export default useEditStudentForm;
