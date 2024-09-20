import StudentHeader from "@/components/dashboard/StudentHeader";
import StudentsTables from "@/components/Tables/StudentsTables";
import { getStudents } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const StudentsPage = () => {
  const { isLoading } = useSelector((state) => state.student);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <StudentHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="overflow-x-scroll  bg-white">
          <StudentsTables />
        </Box>
      )}
    </Box>
  );
};

export default StudentsPage;
