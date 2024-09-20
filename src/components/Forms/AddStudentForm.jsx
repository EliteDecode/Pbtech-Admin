import { Box, Grid } from "@mui/material";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddStudentForm = ({ formik, isLoading }) => {
  return (
    <Box className="">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full ">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="fullname">
                    Fullname
                  </Label>
                  <Input
                    placeholder="e.g. Akinwale "
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fullname && formik.errors.fullname ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.fullname}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    placeholder="e.g.  Adele"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.email}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="course">
                    Course
                  </Label>
                  <Input
                    placeholder="e.g.  Web development"
                    name="course"
                    value={formik.values.course}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.course && formik.errors.course ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.course}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="address">
                    Address
                  </Label>
                  <Input
                    placeholder="e.g.  Adele"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.address}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="phone">
                    Phone number
                  </Label>
                  <Input
                    placeholder="e.g. 203992099923"
                    name="phone"
                    type="number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.phone}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="endDate">
                    End Date
                  </Label>
                  <Input
                    placeholder="e.g. 203992099923"
                    name="endDate"
                    type="date"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.endDate}
                    </span>
                  ) : null}
                </Box>
              </Grid>
            </Grid>

            <Box className="flex space-x-2 mt-10">
              <Button className=" " type="submit" disabled={isLoading}>
                {isLoading ? "Please wait..." : "Add Student"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddStudentForm;
