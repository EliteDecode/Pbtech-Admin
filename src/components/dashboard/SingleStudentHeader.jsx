import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useUploadCertificate from "@/hooks/form-hooks/useUploadCertificate";
import { Box } from "@mui/material";
import { Typography } from "antd";
import teachersImg from "../../assets/icons/teachers-day.png";
import { Input } from "../ui/input";

const SingleStudentHeader = () => {
  const {
    handleUpload,
    handleFileChange,
    previewUrl,
    isLoading,
    certificate,
    singleStudent,
  } = useUploadCertificate();

  const handleDownload = () => {
    fetch(singleStudent?.data?.certificate)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // Use the student's name for the file name, fallback to 'qrcode' if name is not available
        const fileName = `${
          singleStudent?.data?.fullname || "certificate"
        }.png`;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() =>
        alert("An error occurred while downloading the Certificate.")
      );
  };

  return (
    <div>
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <Box className="bg-white flex justify-between my-3 rounded-md px-4  w-full py-5">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of Student
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                Single student details
              </Typography>
            </Box>
          </Box>
          <Box className="flex items-center space-x-2">
            {singleStudent?.data?.certificate && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">View Certificate</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>View Certificate</DialogTitle>
                    <DialogDescription>Student's Certificate</DialogDescription>
                  </DialogHeader>
                  <Box className="">
                    <img
                      src={singleStudent?.data?.certificate}
                      alt="Student Certificate"
                    />

                    <Button onClick={handleDownload} className="mt-4">
                      Download Certificate
                    </Button>
                  </Box>
                </DialogContent>
              </Dialog>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button>Upload Certificate</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Certificate</DialogTitle>
                  <DialogDescription>
                    Upload certificate for the student
                  </DialogDescription>
                </DialogHeader>
                <Box className="">
                  <Box>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {previewUrl && (
                      <Box className="mt-4">
                        <Typography className="mb-2">Preview:</Typography>
                        {certificate.type.startsWith("image/") ? (
                          <img
                            src={previewUrl}
                            alt="Certificate preview"
                            className="max-w-full h-auto"
                          />
                        ) : (
                          <Typography>
                            File selected: {certificate.name}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>
                  {certificate && (
                    <Button
                      className="mt-5"
                      disabled={isLoading}
                      onClick={handleUpload}>
                      {isLoading ? "Uploading..." : "Save Changes"}
                    </Button>
                  )}
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SingleStudentHeader;
