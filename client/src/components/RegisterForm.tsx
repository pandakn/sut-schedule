import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { IRegisterForm } from "../models/auth.interface";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";

const RegisterForm = () => {
  const [inputForm, setInputForm] = useState<IRegisterForm>({
    name: "",
    username: "",
    password: "",
  });

  const { handleRegister, registered, showAlert } = useContext(AuthContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = (event: React.FormEvent) => {
    event.preventDefault();
    handleRegister(inputForm.name, inputForm.username, inputForm.password);
  };

  return (
    <>
      {/* Alert */}
      {!registered.error && showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          {registered.message}
        </Alert>
      )}

      {registered.error && showAlert && (
        <Alert
          textColor="#991b1b"
          bgColor="#fef2f2"
          icon={<VscError className="text-xl" />}
        >
          {registered.message}
        </Alert>
      )}

      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Register</h2>
          <form className="space-y-6" onSubmit={register}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-800"
              >
                Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={inputForm.name}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>
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
            <div>
              <button
                type="submit"
                onSubmit={register}
                className="w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-3xl"
              >
                Register
              </button>
              <p className="mt-4 text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="pl-1 text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
