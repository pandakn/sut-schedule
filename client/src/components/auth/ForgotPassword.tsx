import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

// components
import FormContainer from "../FormContainer";
import { Navigate } from "react-router-dom";

interface ForgotPasswordForm {
  username: string;
  email: string;
}

const ForgotPassword = () => {
  const { handleForgotPassword, forgotPasswordMsg, accessToken } = useAuth();
  const [inputForm, setInputForm] = useState<ForgotPasswordForm>({
    username: "",
    email: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [event.target.name]: event.target.value,
    });
  };

  const forgotPassword = (event: React.FormEvent) => {
    event.preventDefault();
    handleForgotPassword(inputForm.username, inputForm.email);
  };

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer header="forgot password">
      <form className="space-y-6" onSubmit={forgotPassword}>
        <div>
          <label className="block mb-2 font-bold text-gray-800">Username</label>
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
        {forgotPasswordMsg.error && (
          <span className="text-sm text-red-500">
            {forgotPasswordMsg.message}
          </span>
        )}
        <div>
          <label className="block mb-2 font-bold text-gray-800">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={inputForm.email}
            className="w-full p-2 mb-1 border border-gray-300 rounded-lg"
            placeholder="@Enter your email"
          />
        </div>

        <div>
          <button
            type="submit"
            onSubmit={forgotPassword}
            disabled={forgotPasswordMsg.isPending}
            // className="w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-3xl"
            className={`flex items-center justify-center w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-xl ${
              forgotPasswordMsg.isPending
                ? "bg-gray-300 cursor-not-allowed "
                : "bg-black rounded-3xl text-white hover:bg-black/70"
            }`}
          >
            {forgotPasswordMsg.isPending ? (
              <svg
                className="text-white w-7 h-7 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Reset"
            )}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ForgotPassword;
