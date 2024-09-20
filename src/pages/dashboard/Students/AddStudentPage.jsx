import HeaderTitle from "@/components/dashboard/HeaderTitle";
import AddStudentForm from "@/components/Forms/AddStudentForm";
import useAddStudentForm from "@/hooks/form-hooks/useAddStudentForm";
import { Box, Grid } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import schoolImg from "../../../assets/icons/education.png";

const AddStudentPage = () => {
  const { isLoading, formik, handleImageChange } = useAddStudentForm();
  return (
    <Box>
      <HeaderTitle
        img={schoolImg}
        title="Add New Student"
        subtitle=" Add a new student"
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
            New Student
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Box className="bg-white sm:w-[40%] w-[95%] m-auto rounded-md p-5 ">
              <Box>
                <AddStudentForm
                  formik={formik}
                  isLoading={isLoading}
                  handleImageChange={handleImageChange}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddStudentPage;
