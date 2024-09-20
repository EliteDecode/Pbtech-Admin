import { useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import Login from "./pages/auth/Login";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import Page404 from "./pages/notFound/Page404";
import StudentsPage from "./pages/dashboard/Students/StudentsPage";
import EditStudentsPage from "./pages/dashboard/Students/EditStudentsPage";
import AddStudentPage from "./pages/dashboard/Students/AddStudentPage";
import SingleStudent from "./pages/dashboard/Students/SingleStudent";

// routes

export default function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          element: !token ? <Navigate to="/login" /> : <DashboardLayout />,
          path: "/dashboard",
          children: [
            { element: <Navigate to="/dashboard/home" />, index: true },
            {
              path: "home",
              element: <DashboardHomePage />,
            },
            {
              path: "students",
              element: <StudentsPage />,
            },
            {
              path: "students/:studentId",
              element: <SingleStudent />,
            },
            {
              path: "students/edit-student/:studentId",
              element: <EditStudentsPage />,
            },
            {
              path: "students/add-student",
              element: <AddStudentPage />,
            },
          ],
        },

        {
          path: "/login",
          element: <Login />,
        },
        { path: "/404", element: <Page404 /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ])}
    />
  );
}
