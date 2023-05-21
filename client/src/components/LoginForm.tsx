import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ILoginForm } from "../models/auth.interface";
import Alert from "./Alert";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";

const LoginForm = () => {
  const [inputForm, setInputForm] = useState<ILoginForm>({
    username: "",
    password: "",
  });
  const { handleLogin, loggedIn, showAlert } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(inputForm.username, inputForm.password);
  };

  return (
    <>
      {/* Alert */}
      {!loggedIn.error && showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          {loggedIn.message}
        </Alert>
      )}

      {loggedIn.error && showAlert && (
        <Alert
          textColor="#991b1b"
          bgColor="#fef2f2"
          icon={<VscError className="text-xl" />}
        >
          {loggedIn.message}
        </Alert>
      )}

      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <form className="space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 font-bold text-gray-800"
              >
                Username
              </label>
              <input
                required
                type="text"
                id="username"
                name="username"
                onChange={handleInputChange}
                value={inputForm.username}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your username"
              />
            </div>
            {/* show msg error */}
            {loggedIn.error && (
              <span className="text-sm text-red-500">{loggedIn.message}</span>
            )}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-bold text-gray-800"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
                value={inputForm.password}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            {/* show msg error */}
            {loggedIn.error && (
              <span className="text-sm text-red-500">{loggedIn.message}</span>
            )}

            <div>
              <button
                type="submit"
                onSubmit={login}
                className="w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-3xl"
              >
                Login
              </button>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="pl-1 text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
