import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios";
import Navbar from "../components/Navbar";
import { SET_CURRENT_USER } from "../features/auth/authSlice";

const DefaultLayout = () => {
  const userToken = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosClient.get("/user").then((response) => {
      dispatch(
        SET_CURRENT_USER({
          user: response.data,
        })
      );
    });
  }, []);

  if (!userToken) {
    return <Navigate to="login" />;
  }

  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
