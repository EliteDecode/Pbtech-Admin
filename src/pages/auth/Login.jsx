import React, { useEffect } from "react";
import { Box } from "@mui/material";
import LoginForm from "@/components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import bg from "@/assets/images/abt7.jpg";

const Login = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Box
      className="h-screen flex items-center justify-center relative"
      style={{
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}>
      {/* Dark overlay */}
      <Box
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity for the desired darkness
          zIndex: 1,
        }}></Box>

      {/* Login form container */}
      <Box
        className="relative z-10 container-c sm:w-[40%] w-[100%] rounded-md sm:h-[50vh] h-[30vh] flex flex-col items-center justify-center m-auto shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
          backdropFilter: "blur(10px)", // Adds a blur effect for a frosted glass look
        }}>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
