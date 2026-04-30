import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminProjectsPage from "../pages/AdminProjectsPage";
import AdminSkillsPage from "../pages/AdminSkillsPage";
import AdminExperiencesPage from "../pages/AdminExperiencesPage";
import AdminProfilePage from "../pages/AdminProfilePage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "projects",
            element: <AdminProjectsPage />,
          },
          {
            path: "skills",
            element: <AdminSkillsPage />,
          },
          {
            path: "experiences",
            element: <AdminExperiencesPage />,
          },
          {
            path: "profile",
            element: <AdminProfilePage />,
          },
        ],
      },
    ],
  },
]);
