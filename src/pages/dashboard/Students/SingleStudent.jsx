import { Box } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useEffect } from "react";

import SingleStudentDetails from "@/components/dashboard/SingleStudentDetails";
import SingleStudentHeader from "@/components/dashboard/SingleStudentHeader";
import { getSingleStudent } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
const SingleStudent = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { isLoading, singleStudent } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getSingleStudent(studentId));
  }, []);

  return (
    <Box>
      <SingleStudentHeader studentId={singleStudent?.data?.id} />
      <Box role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/students"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Students
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Single Student
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        {isLoading && !singleStudent ? (
          <Loader />
        ) : (
          <SingleStudentDetails singleStudent={singleStudent} />
        )}
      </Box>
    </Box>
  );
};

export default SingleStudent;
