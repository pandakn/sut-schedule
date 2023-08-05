import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// components
import FormContainer from "../FormContainer";

// interface
import { ILoginForm } from "../../models/auth.interface";

const LoginForm = () => {
  const [inputForm, setInputForm] = useState<ILoginForm>({
    username: "",
    password: "",
  });
  const { handleLogin, loggedIn } = useAuth();

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
    <FormContainer header="login">
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
            className="w-full p-2 mb-1 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        {/* show msg error */}
        {loggedIn.error && (
          <span className="text-sm text-red-500 ">
            {loggedIn.message}
            <br />
          </span>
        )}
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>

        <div>
          <button
            type="submit"
            onSubmit={login}
            className="w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-xl"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="pl-1 text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
