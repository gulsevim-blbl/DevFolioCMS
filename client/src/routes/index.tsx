import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import GBLoader from "../components/GBLoader";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));
const AdminProjectsPage = lazy(() => import("../pages/AdminProjectsPage"));
const AdminSkillsPage = lazy(() => import("../pages/AdminSkillsPage"));
const AdminExperiencesPage = lazy(() => import("../pages/AdminExperiencesPage"));
const AdminProfilePage = lazy(() => import("../pages/AdminProfilePage"));

const withLoader = (Component: React.ElementType) => (
  <Suspense fallback={<GBLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withLoader(HomePage),
  },
  {
    path: "/login",
    element: withLoader(LoginPage),
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
            element: withLoader(AdminDashboardPage),
          },
          {
            path: "projects",
            element: withLoader(AdminProjectsPage),
          },
          {
            path: "skills",
            element: withLoader(AdminSkillsPage),
          },
          {
            path: "experiences",
            element: withLoader(AdminExperiencesPage),
          },
          {
            path: "profile",
            element: withLoader(AdminProfilePage),
          },
        ],
      },
    ],
  },
]);
