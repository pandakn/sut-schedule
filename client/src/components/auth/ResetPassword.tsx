import { useState } from "react";
import { useAuth } from "../../hooks";
import FormContainer from "../FormContainer";
import toast from "react-hot-toast";

type IResetPassword = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { verifiedOtp, handleResetPassword } = useAuth();
  const [inputForm, setInputForm] = useState<IResetPassword>({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [event.target.name]: event.target.value,
    });
  };

  const resetPassword = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputForm.newPassword !== inputForm.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    verifiedOtp.username &&
      handleResetPassword(verifiedOtp.username, inputForm.newPassword);
  };

  return (
    <FormContainer header="reset password">
      <form className="space-y-6" onSubmit={resetPassword}>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-800"
          >
            New Password
          </label>
          <input
            required
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={handleInputChange}
            value={inputForm.newPassword}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-800"
          >
            Confirm New Password
          </label>
          <input
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            value={inputForm.confirmPassword}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button
            type="submit"
            onSubmit={resetPassword}
            className="w-full px-6 py-2 text-xl font-medium text-white uppercase bg-black rounded-xl"
          >
            Reset Password
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ResetPassword;
