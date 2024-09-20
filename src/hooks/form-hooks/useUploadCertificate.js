import { reset, updateStudent } from "@/features/students/studentSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useUploadCertificate = () => {
  const [certificate, setCertificate] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, message, singleStudent } = useSelector(
    (state) => state.student
  );

  const { studentId } = useParams();

  useEffect(() => {
    if (isSuccess && message == "student edited successfully") {
      toast.success("Congratulations student updated successfully");
      // navigate("/dashboard/students");
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCertificate(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (certificate) {
      setLoading(true);
      const certificateFile = new FormData();
      certificateFile.append("file", certificate);
      certificateFile.append("upload_preset", "bezf4kul");
      try {
        const pictureResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dgriiqmlx/image/upload",
          certificateFile
        );

        if (pictureResponse) {
          setLoading(false);
          dispatch(
            updateStudent({
              certificate: pictureResponse.data.secure_url,
              studentId,
            })
          );
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return {
    handleUpload,
    handleFileChange,
    previewUrl,
    isLoading: loading || isLoading,
    certificate,
    singleStudent,
  };
};

export default useUploadCertificate;
