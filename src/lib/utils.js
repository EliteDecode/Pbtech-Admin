import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import overviewImg from "../assets/icons/dashboard.png";
import studentsImg from "../assets/icons/student.png";

export const sidebar = [
  {
    title: "Overview",
    content: [
      {
        Title: "Dashboard",
        Icon: overviewImg,
        link: "home",
      },
    ],
  },
  {
    title: "Student Management",
    content: [
      {
        Title: "Students",
        Icon: studentsImg,
        link: "students",
      },
    ],
  },
];
