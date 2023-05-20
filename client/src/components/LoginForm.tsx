import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ILoginFrom } from "../models/login.interface";

const LoginForm = () => {
  const [inputForm, setInputForm] = useState<ILoginFrom>({
    username: "",
    password: "",
  });
  const { handleSubmit } = useContext(AuthContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event: React.FormEvent) => {
    handleSubmit(event, inputForm.username, inputForm.password);
  };

  return (
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
              onSubmit={login}
              className="w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-3xl"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
