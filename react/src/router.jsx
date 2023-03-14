import { createBrowserRouter, Navigate } from "react-router-dom";
import Surveys from "./features/surveys/Surveys";
import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import SurveyPublicView from "./pages/SurveyPublicView";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ErrorPage from "./pages/ErrorPage";
import SurveyForm from "./features/surveys/SurveyForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/surveys/create",
        element: <SurveyForm />,
      },
      {
        path: "/surveys/:id",
        element: <SurveyForm />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/survey/public/:slug",
    element: <SurveyPublicView />,
    errorElement: <ErrorPage />,
  },
]);

export default router;