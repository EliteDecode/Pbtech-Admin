import React from "react";
import { Box, Grid, Button } from "@mui/material";
import { Typography } from "antd";
import EditStudentForm from "../Forms/EditStudentForm";
import useEditStudentForm from "@/hooks/form-hooks/useEditStudentForm";
import { DownloadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { CopyIcon } from "@radix-ui/react-icons";

const SingleStudentDetails = ({ singleStudent }) => {
  const { formik, isLoading } = useEditStudentForm();
  const studentsDetails = [
    {
      title: "Firstname",
      value: singleStudent?.data?.fullname,
    },
    {
      title: "Email",
      value: singleStudent?.data?.email,
    },
    {
      title: "School Id number",
      value: singleStudent?.data?.studentId,
    },
    {
      title: "Course",
      value: singleStudent?.data?.course,
    },
    {
      title: "Address",
      value: singleStudent?.data?.address,
    },
    {
      title: "Phone Number",
      value: singleStudent?.data?.phone,
    },
  ];

  const handleDownloadQRCode = () => {
    fetch(singleStudent?.data?.studentQrCode)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // Use the student's name for the file name, fallback to 'qrcode' if name is not available
        const fileName = `${singleStudent?.data?.fullname || "qrcode"}.png`;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("An error occurred while downloading the QR code."));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://purplebeetech.com/student/${singleStudent?.data?.studentId}`
    );
    toast.success("Link copied successfully");
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={6}>
        <Box className="bg-white rounded-md p-5 grid grid-cols-2 ">
          <Box>
            <Box className="space-y-4">
              {studentsDetails.map((item, index) => (
                <Box key={index} className="flex flex-col">
                  <Typography className="font-bold text-[14px] text-primary">
                    {item.title}:
                  </Typography>
                  <Typography>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="rounded-md space-y-4">
            <Box className="flex flex-col items-center justify-end">
              <img
                src={singleStudent?.data?.studentQrCode}
                alt="QR Code"
                className="sm:w-[80%] w-full bg-white shadow-md rounded-md mb-2"
              />
              <Box className="space-y-2 flex flex-col justify-center items-center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<DownloadOutlined />}
                  onClick={handleDownloadQRCode}>
                  Download QR Code
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  startIcon={<CopyIcon />}
                  onClick={copyLink}>
                  Copy Link
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={12} md={6} className="flex flex-row items-end justify-end">
        <Box className="bg-white p-3 sm:w-[80%] w-full ">
          <EditStudentForm formik={formik} isLoading={isLoading} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SingleStudentDetails;
