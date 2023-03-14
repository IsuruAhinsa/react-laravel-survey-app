import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/Checkbox";
import axiosClient from "../../axios";
import { useDispatch } from "react-redux";
import { Alert } from "../../components/Alert";
import { SET_CURRENT_USER } from "./authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    setErrors({});

    axiosClient
      .post("/login", {
        email,
        password,
        remember,
      })
      .then((response) => {
        dispatch(
          SET_CURRENT_USER({ user: response.data.user, token: response.data.token })
        );
      })
      .catch((error) => {
        if (error.response) {
          const errors = Object.values(error.response.data.errors).reduce(
            (previous, current) => [...previous, ...current],
            []
          );

          setErrors(errors);
        }
        console.error(error.message);
      });
  };

  return (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up your account
          </Link>
        </p>
      </div>

      {errors.length > 0 && <Alert errors={errors} />}

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              label="Remeber me"
              id="remember"
              name="remember"
              onChange={(e) => setRemember(e.target.checked)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
