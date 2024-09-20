import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import EditStudentForm from "@/components/Forms/EditStudentForm";
import useEditStudentForm from "@/hooks/form-hooks/useEditStudentForm";
import Loader from "@/lib/Loader";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import schoolImg from "../../../assets/icons/education.png";

const EditStudentsPage = () => {
  const { formik, isLoading } = useEditStudentForm();
  return (
    <Box>
      <HeaderTitle
        img={schoolImg}
        title="Edit Student"
        subtitle="Edit the details of a student"
      />
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
            Edit Student Details
          </Link>
        </Breadcrumbs>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <EditStudentForm formik={formik} />
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12} md={4}>
              <Box className=" rounded-md space-y-4">
                <Box className="flex items-center justify-end ">
                  <img
                    src={formik.values.picture}
                    alt="Student Passport"
                    className="sm:w-[50%] w-full bg-white p-3 shadow-md rounded-md"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EditStudentsPage;
