import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import React, { useEffect } from "react";
import dashboardImg from "../../assets/icons/dashboard.png";

import { Calendar } from "@/components/ui/calendar";
import { getStudents } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import calenderImg from "../../assets/icons/calendar.png";
import resultImg from "../../assets/icons/results.png";
import studentsImg from "../../assets/icons/student.png";
import AreaChartComp from "../../components/Charts/AreaChartComp";

const DashboardHomePage = () => {
  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);

  // useEffect(() => {
  //   dispatch(getStudents());
  // }, [dispatch]);

  const HomeCardContents = [
    {
      title: "Total Student",
      description: students?.data?.length || "0",
      image: studentsImg,
      buttonText: "View Students",
      link: "/dashboard/students",
    },
    {
      title: "Calendar",
      description: "",
      image: calenderImg,
      buttonText: "View Calendar",
      link: "/dashboard/calendar",
    },
    {
      title: "Blog Posts",
      description: "0",
      image: resultImg,
      buttonText: "View Blog Posts",
      link: "/dashboard/results",
    },
  ];

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item sm={12} md={9}>
          <HeaderTitle
            img={dashboardImg}
            title="Overview"
            subtitle="Showing all data in the system"
          />
          <Grid container spacing={2}>
            {HomeCardContents.map((item, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <Card className="border-none">
                  <Box className="flex justify-between items-center">
                    <CardHeader>
                      <CardTitle className="text-[12px]">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-primary font-semibold">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <Box className="p-6">
                      <img
                        src={item.image}
                        alt={`${item.title} image`}
                        className="w-[32px]"
                      />
                    </Box>
                  </Box>
                  <CardFooter>
                    <Link to={item.link}>
                      <Button size="sm" variant="secondary">
                        {item.buttonText}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Box className="sticky top-0 border-l border-[#fafafa] sm:h-[100vh] h-min-screen overflow-y-scroll px-3 pt-5 pb-12">
            <Box>
              <Typography className="font-bold text-purple-900">
                Recent activities
              </Typography>
              <Typography className="text-[9px] text-gray-600">
                Showing last 6 result updated
              </Typography>
            </Box>

            <Box className="bg-white w-full rounded-lg mt-5">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-full shadow"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHomePage;
